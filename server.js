const path = require('path');
const express = require('express');
const app = express();
const prisma = require('./prismaClient');
const cors = require("cors");
const bcrypt = require('bcryptjs');
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const { version, validate } = require('uuid');

var bodyParser = require("body-parser");
var jwt = require('jsonwebtoken');

var passport = require("passport");
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'sosiska';

var strategy = new JwtStrategy(jwtOptions, async function (jwt_payload, next) {
  console.log('payload received', jwt_payload);
  // usually this would be a database call:
  var user = await prisma.user.findFirst({
    where: {
      id: {
        equals: jwt_payload.id
      }
    }
  })
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

passport.use(strategy);

const ACTIONS = require('./src/socket/actions');
const PORT = 3001;

function getClientRooms() {
  const { rooms } = io.sockets.adapter;

  return Array.from(rooms.keys()).filter(roomID => validate(roomID) && version(roomID) === 4);
}

function shareRoomsInfo() {
  io.emit(ACTIONS.SHARE_ROOMS, {
    rooms: getClientRooms()
  })
}

io.on('connection', socket => {

  shareRoomsInfo();
  console.log('connected', socket.id)
  socket.on(ACTIONS.JOIN, config => {
    const { room: roomID } = config;
    const { rooms: joinedRooms } = socket;

    console.log('user', socket.id, 'join', roomID)
    if (Array.from(joinedRooms).includes(roomID)) {
      return console.warn(`Already joined to ${roomID}`);
    }

    const clients = Array.from(io.sockets.adapter.rooms.get(roomID) || []);

    clients.forEach(clientID => {
      io.to(clientID).emit(ACTIONS.ADD_PEER, {
        peerID: socket.id,
        createOffer: false
      });

      socket.emit(ACTIONS.ADD_PEER, {
        peerID: clientID,
        createOffer: true,
      });
    });

    socket.join(roomID);
    shareRoomsInfo();
  });

  function leaveRoom() {
    const { rooms } = socket;

    Array.from(rooms)
      // LEAVE ONLY CLIENT CREATED ROOM
      .filter(roomID => validate(roomID) && version(roomID) === 4)
      .forEach(roomID => {

        const clients = Array.from(io.sockets.adapter.rooms.get(roomID) || []);

        clients
          .forEach(clientID => {
            io.to(clientID).emit(ACTIONS.REMOVE_PEER, {
              peerID: socket.id,
            });
            socket.emit(ACTIONS.REMOVE_PEER, {
              peerID: clientID,
            });
          });

        socket.leave(roomID);
      });

    console.log('disconnected', socket.id)
    shareRoomsInfo();
  }

  socket.on(ACTIONS.LEAVE, leaveRoom);
  socket.on('disconnecting', leaveRoom);

  socket.on(ACTIONS.RELAY_SDP, ({ peerID, sessionDescription }) => {
    io.to(peerID).emit(ACTIONS.SESSION_DESCRIPTION, {
      peerID: socket.id,
      sessionDescription,
    });
  });

  socket.on(ACTIONS.RELAY_ICE, ({ peerID, iceCandidate }) => {
    io.to(peerID).emit(ACTIONS.ICE_CANDIDATE, {
      peerID: socket.id,
      iceCandidate,
    });
  });

  socket.on(ACTIONS.SEND_MESSAGE, (data) => {
    socket.to(data.room).emit(ACTIONS.RECEIVE_MESSAGE, data);
  });
});

const publicPath = path.join(__dirname, 'build');

app.use(express.static(publicPath));
app.use(cors());

app.get('*', (req, res) => {

  res.sendStatus(200);
});


app.post('/registration/manager', async (req, res) => {

  const companyCatch = await prisma.company.findFirst({
    where: {
      name: {
        equals: req.query['companyName']
      }
    }
  });
  if(!companyCatch){
    const company = await prisma.company.create({ data: { name: req.query['companyName']} });

    const getCompany = await prisma.company.findUnique({
      where: {
        name: req.query['companyName'],
      }
    })
    
    const userdata = {
      login: req.query['login'],
      password: req.query['password'],
      companyId: getCompany.id,
      roleId: 1,
    }
    
    try {
      
      const user = await prisma.user.create({ data: userdata });
      return res.json(user)
    } catch (e) {
      console.log(userdata);
      console.log(e.message)
      return res.sendStatus(400)
    }
  }
  else{
    return res.sendStatus(400)
  }


});

app.post('/registration/employee', async (req, res) => {
  const getCompany = await prisma.company.findUnique({
    where: {
      name: req.query['companyName'],
    }
  })

  const userdata = {
    login: req.query['login'],
    password: req.query['password'],
    companyId: getCompany.id,
    roleId: 2,
  }
  try {
    const user = await prisma.user.create({ data: userdata });
    return res.json(user)
  } catch (e) {
    console.log(e.message)
    return res.sendStatus(400)
  }
});

app.post('/update', async (req, res) => {
  const update = await prisma.user.update({
    where: {
      login: req.query['login'],
    },
    data: {
      firstName: req.query['firstName'] != null ? req.query['firstName'] : 'null',
      name: req.query['name'] != null ? req.query['name'] : undefined,
      midleName: req.query['midleName'] != null ? req.query['midleName'] : undefined,
      phone: req.query['phone'] != null ? req.query['phone'] : undefined,
      date: req.query['date'] != null ? req.query['date'] : undefined,
    }
  });

});

app.post('/userDelete', async (req, res) => {
  const deleteUser = await prisma.user.delete({
    where: {
      id: req.query['id'],
    }
  });

});

app.post('/idBg', async (req, res) => {
  const update = await prisma.user.update({
    where: {
      login: req.query['login'],
    },
    data: {
      bg: req.query['idBg'],
    }
  });

});

app.post('/bgStile', async (req, res) => {
  const getUser = await prisma.user.findUnique({
    where: {
      login: req.query['login'],
    }
  });
  
  if (getUser) {
    return res.json(getUser.bg);
  }
});

app.post('/user', async (req, res) => {
  const getCompany = await prisma.company.findUnique({
    where: {
      name: req.query['companyName'],
    }
  })

  const getUser = await prisma.user.findMany({
    where: {
      companyId: getCompany.id,
    }
  })
  
  var userInfo = [];

  for(let i = 0; i<getUser.length;i++){
    userInfo[i]= {id: getUser[i].id, firstName: getUser[i].firstName, name: getUser[i].name, midleName: getUser[i].midleName, phone: getUser[i].phone};
  }
  
  return res.json({userInfo});
});

app.post('/advertisement', async (req, res) => {
  const getCompany = await prisma.company.findUnique({
    where: {
      name: req.query['companyName'],
    }
  })

  const getAdvertisement = await prisma.advertisement.findMany({
    where: {
      companyId: getCompany.id,
    }
  })
  
  var advertisementInfo = [];

  for(let i = 0; i<getAdvertisement.length;i++){
    advertisementInfo[i]= {title: getAdvertisement[i].title, text: getAdvertisement[i].text};
  }
  
  return res.json({advertisementInfo});
});

app.post('/advertisementAdd', async (req, res) => {
  const getCompany = await prisma.company.findUnique({
    where: {
      name: req.query['companyName'],
    }
  })
  
  const advertisementdata = {
    title: req.query['title'],
    text: req.query['text'],
    companyId: getCompany.id,
  }
  
  try {
    
    const advertisement = await prisma.advertisement.create({ data: advertisementdata });
  } catch (e) {
    console.log(e.message)
    return res.sendStatus(400)
  }
});

app.post("/login", async function (req, res) {
  if (req.query['login'] && req.query['password']) {
    var login = req.query['login'];
    var password = req.query['password'];
  }
  // usually this would be a database call:
  const user = await prisma.user.findFirst({
    where: {
      login: {
        equals: login
      }
    }
  });
  if (!user) {
    return res.status(401).json({ message: "no such user found" });

  }
  if (user.password === password) {
    // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
    var payload = { id: user.id };
    var token = jwt.sign(payload, jwtOptions.secretOrKey);
    const getCompany = await prisma.company.findUnique({
      where: {
        id: user.companyId,
      }
    })
    var userInfo = {firstName: user.firstName, name: user.name, midleName: user.midleName, phone: user.phone, date: user.date, company: getCompany.name, role: user.roleId};
    return res.json({ message: "ok", token: token, userInfo});

  } else {
    return res.status(401).json({ message: "passwords did not match" });

  }
});

let timerId = setTimeout(async function tick() {
  await prisma.advertisement.deleteMany({})
  console.log('Clean')
  timerId = setTimeout(tick, 604800000);
},604800000);

app.post('/profile', passport.authenticate('jwt', { session: false }), (req, res) => { res.status(200).send(req.user) });

server.listen(PORT, () => {
  console.log('Server Started!', PORT)
});