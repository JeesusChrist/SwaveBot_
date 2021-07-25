const tmi = require('tmi.js');
const request = require("request");

const client = new tmi.Client({
  options: { debug: true },
  connection: {
    secure: true,
    reconnect: true
  },
  identity: {
    username: 'SwaveBot_',
    password: 'oauth:673naodf7r3bdwxmracmud0mzjtuqf'
  },
  channels: ['Swave']
});

queue = [];
qEnabled = true;
qOpen = false;
qSize = 2;

client.connect();

client.on('message', (channel, tags, message, self) => {

    isMod = tags.mod || tags['user-type'] === 'mod';
    isBroadcaster = channel.slice(1) === tags.username;
    isModUp = isMod || isBroadcaster;

    if(self || !message.startsWith('!')) {
      if(message.toLowerCase().includes("jesus") || message.toLowerCase().includes("jessus")){
        client.say(channel, `Jeesus*`);
      }
      return;
    }
 
    args = message.slice(1).split(' ');
    command = args.shift().toLowerCase();
 
    if(command === 'join') {
      command = 'q';
      args[0] = 'join';
    }
    else if(command === 'leave') {
        command = 'q';
        args[0] = 'leave';
    }
    else if(command === 'position' || command === 'myposition') {
        command = 'q';
        args[0] = 'position';
    }
    else if(command === 'size' || command === 'length'){
        command = 'q';
        args[0] = 'size';
    }
    else if(command === 'love') {
      if(args[0]){
        args[0].toLowerCase;
        switch (tags.username){
          case "anyway_simming":
            if(args[0] == 'lux_di' || args[0] == '@lux_di' || args[0] == 'lux'){
              client.say(channel, `${tags.username} and ${args[0]} are ${Math.floor(Math.random() * 10) + 90}% in love.`);
            }
            else{
              client.say(channel, `${tags.username} and ${args[0]} are ${Math.floor(Math.random() * 100)}% in love.`);
            }
            break;
          case "lux_di":
            if(args[0] == 'anyway_simming' || args[0] == '@anyway_simming' || args[0] == 'anyway'){
              client.say(channel, `${tags.username} and ${args[0]} are ${Math.floor(Math.random() * 10) + 90}% in love.`);
            }
            else{
              client.say(channel, `${tags.username} and ${args[0]} are ${Math.floor(Math.random() * 100)}% in love.`);
            }
            break;
          case "jeesuschristt":
            if(args[0] == 'swoof' || args[0] == '@swoof'){
              client.say(channel, `${tags.username} and ${args[0]} are ${Math.floor(Math.random() * 10) + 90}% in love.`);
            }
            else{
              client.say(channel, `${tags.username} and ${args[0]} are ${Math.floor(Math.random() * 100)}% in love.`);
            }
            break;
          default:
            client.say(channel, `${tags.username} and ${args[0]} are ${Math.floor(Math.random() * 100)}% in love.`);
        }
      }
      else
        client.say(channel, `${tags.username} is ${Math.floor(Math.random() * 100)}% in love with themself.`);
    }
    else if(command === 'ducksize'){
      client.say(channel, `${tags.username} has a duck size of ${Math.floor(Math.random() * 20)} feet! Jebaited`);
    }
    else if (command === 'brickness'){
      var name = tags.username.toLowerCase().replace("@","");
      date=(new Date().setHours(0,0,0,0));
      date = date / 2;
      hash=0;
      for(i=0;i<name.length;i++){
        hash=((hash<<5)-hash)+name.charCodeAt(i);
        hash|=0
      };
        seed=((hash>>>0)*date)%2147483647;
        r = seed % 101;
      client.say(channel, `${tags.username} is ${r}% a brick today. swave3Wave`);
    }
    else if (command === 'vibes' || command === 'vibecheck'){
      var name = tags.username.toLowerCase().replace("@","");
      date=(new Date().setHours(0,0,0,0));
      hash=0;
      for(i=0;i<name.length;i++){
        hash=((hash<<5)-hash)+name.charCodeAt(i);
        hash|=0
      };
        seed=((hash>>>0)*date)%2147483647;
        r = seed % 101;
      if(r > 49)
        client.say(channel, `${tags.username}'s vibes are at ${r}% today. ${tags.username} passed the vibe check! swave3EZ `);
      else
        client.say(channel, `${tags.username}'s vibes are at ${r}% today. ${tags.username} failed the vibe check... Sadge`);
    }
    else if (command === 'erank'){
      request.get(
        `http://www.xnugget.com:8080/rl/steam/76561198065220029?playlists=RUMBLE,DROPSHOT,SNOWDAY,HOOPS`,
            (err, res, body) => {
            if (err) {
               return;
            }
            else {
                response = body;
                client.say(channel, `${tags.username} -> ${body}`);
            };
        }
      );
    }
    else if (command === 'rank' || command === 'ranks'){
      request.get(
        `http://www.xnugget.com:8080/rl/steam/76561198065220029?playlists=2v2,1v1,3v3,TOURNAMENT`,
            (err, res, body) => {
            if (err) {
               return;
            }
            else {
                response = body;
                client.say(channel, `${tags.username} -> ${body}`);
            };
        }
      );
    }
    else if (command === 'followage'){
      if(args[0])
        target = args[0];
      else
        target = tags.username

      if(target == "boxacle"){
        client.say(channel, `boxacle has been following Swave for 9000 years`);
      }
      else{
        request.get(
        `https://api.2g.be/twitch/followage/${channel.substring(1)}/${target}?format=mwdhms`,
            (err, res, body) => {
            if (err) {
               return;
            }
            else {
                response = body;
                client.say(channel, `${response}`);
            };
        });
      }
    }
 
    else if(command === 'iq'){
      var testfollow = "";

      request.get(
        `https://api.2g.be/twitch/followage/${channel.substring(1)}/${tags.username}?format=mwdhms`,
            (err, res, body) => {
            if (err) {
               return;
            }
            else {
                response = body;
            };
        });
       

        setTimeout(() => {
          if(!response.includes("not following") || isBroadcaster){
          var name = tags.username.toLowerCase().replace("@","");
          date=(new Date().setHours(0,0,0,0));
          date = date - 3600000;
          hash=0;
          for(i=0;i<name.length;i++){
            hash=((hash<<5)-hash)+name.charCodeAt(i);
            hash|=0
          };
            seed=((hash>>>0)*date)%2147483647;
            seed = name == "Swave" ? 1004: ((seed*16807)%1003)-2;
            client.say(channel, `${tags.username} has an iq of ${seed}.`);
          }
          else{
            client.say(channel, `${tags.username} has an iq of 0, since they are not following... WeirdChamp`);
      }
      }, 1500);

    }
    if(command === 'q'){

if (qEnabled)
{
    if (args.length >= 1) /* if there is an attempted subcommand */
    {
      cmd = args[0];
        switch (cmd)
        {
            case "off":
            case "disable":
                if (isModUp)
                {
                  qEnabled = false;
                  qOpen = false;
                  queue.splice(0);
                  client.say(channel, 'Queue functions are now disabled!');
                }
                else
                    client.say(channel, `@${tags.username}, you must be a mod to do this!`);
                break;
            case "start":
            case "begin":
            case "open":
                if (isModUp)
                {
                    if (qOpen)
                        client.say(channel, 'Queue is already open.');
                    else {
                      qOpen = true;
                      client.say(channel, 'Queue is now open!');
                    }  
                }
                else
                  client.say(channel, `@${tags.username}, you must be a mod to do this!`);
                break;
            case "stop":
            case "end":
            case "close":
                if (isModUp)
                {
                    if (!qOpen)
                      client.say(channel, 'Queue is already closed!');
                    else{
                      qOpen = false;
                      client.say(channel, 'Queue is now closed!');
                    }
                }
                else
                  client.say(channel, `@${tags.username}, you must be a mod to do this!`);
                break;
            case "view":
            case "show":
            case "list":
            case "all":
                if (isModUp){
                    if(queue.length == 0)
                      client.say(channel, 'Queue is currently empty.');
                    else
                      client.say(channel, `Queue: ${queue.join(', ')}.`);
                }
                else
                  client.say(channel, `@${tags.username}, you must be a mod to do this!`);
                break;
            case "setTeams":
            case "getTeams":
            case "team":
            case "teams":
              if (isModUp)
                {
                  numGroups = 0;
                  if (queue.length < qSize)
                    client.say(channel, `${tags.username} -> The number of players in the queue isn't high enough to generate a new group of size ${qSize}`);
                  else
                  {
                      teems = "";
                      numGroups = Math.floor(queue.length / qSize);
                     
                      for(i= 0; i < numGroups; i++)
                        {
                                ranPerson = Math.floor(Math.random() * queue.length);
                                do{
                                  ranPerson2 = Math.floor(Math.random() * queue.length);
                                } while(ranPerson2 == ranPerson);
                               
                                temp1 = queue.splice(ranPerson, 1);
                                  if(ranPerson > ranPerson2)
                                    temp2 = queue.splice(ranPerson2, 1);
                                  else
                                    temp2 = queue.splice(ranPerson2 - 1, 1);

                                group = [temp1, temp2];
                                if(i == 0)
                                  teems += "[" + group.join(' - ') + "]";
                                else
                                  teems += " , [" + group.join(' - ') + "]";

                                if(queue.length == 1)
                                  teems += " There was not a teamate for: " + queue.splice(0);  
                        }
                    }
                    if(numGroups != 0){
                      client.say(channel, `Teams: ${teems}`);
                      qOpen = false;
                    }
                }
                else
                  client.say(channel, `@${tags.username}, you must be a mod to do this!`);
              break;
            case "next":
              if (isModUp)
                {
                  if(queue.length < 1)
                    client.say(channel, `@${tags.username} ,The queue is currently empty.`);
                  else
                  {
                    if (args.length === 2)
                      {
                        if(queue.length < args[1])
                          client.say(channel, `@${tags.username} ,There is not enough users in the queue. Queue currently has ${queue.length} users.`);
                        else
                        {
                          client.say(channel, `Next ${args[1]} users in queue: ${queue.splice(0,args[1]).join(', ')}`);
                        }
                      }
                    else if(args.length === 1){
                      client.say(channel, `Next in queue: ${queue.splice(0,1)}`);
                    }
                    else
                      client.say(channel, `@${tempuser} ,"!q next" to get the next user or "!q next x" to get the next x users.`);
                  }
                }
              else
                client.say(channel, `@${tags.username}, you must be a mod to do this!`);
            break;
            case "random":
              if (isModUp)
                {
                  if(queue.length < 1)
                    client.say(channel, `@${tags.username} ,The queue is currently empty.`);
                  else
                  {
                    if (args.length === 2)
                      {
                        if(queue.length < args[1])
                          client.say(channel, `@${tags.username} ,There is not enough users in the queue. Queue currently has ${queue.length} users.`);
                        else
                        {
                          tempQ = [];
                          for(i = 0; i < args[1]; i++){
                            ranNum = Math.floor(Math.random() * queue.length);
                            tempQ.push(queue.splice(ranNum, 1));
                          }
                          client.say(channel, `Next ${args[1]} users in queue: ${tempQ.splice(0,args[1]).join(', ')}`);
                        }
                      }
                    else if(args.length === 1){
                      ranNum = Math.floor(Math.random() * queue.length);
                      client.say(channel, `Next in queue: ${queue.splice(ranNum,1)}`);
                    }
                    else
                      client.say(channel, `@${tempuser} ,"!q next" to get the next user or "!q next x" to get the next x users.`);
                  }
                }
              else
                client.say(channel, `@${tags.username}, you must be a mod to do this!`);
            break;
            case "setsize":
            case "changesize":
                if (isModUp)
                {
                    if (true)
                    {
                        newSize = parseInt(cmd);
                        if (isNaN(newSize) || newSize <= 0)
                          client.say(channel, `Please enter a positive integer.`);
                        else
                            if (qSize == newSize)
                                client.say(channel, `The team size is already set to ${qSize}.`);
                            else
                              client.say(channel, `This would normally set the size to ${newSize}, but that would break everything because whoever coded me is lazy :)`);
                    }
                    else
                        client.say(channel, `How tf did you even make this text appear?`);
                }
                else
                  client.say(channel, `@${tags.username}, you must be a mod to do this!`);
                break;
            case "clear":
            case "reset":
                if (isModUp)
                {
                    if (queue.length == 0)
                        client.say(channel, `The queue is already empty!`);
                    else{
                        queue.splice(0);
                        client.say(channel, `Queue is now empty!`);
                    }
                }
                else
                  client.say(channel, `@${tags.username}, you must be a mod to do this!`);
                break;
            case "add":
            case "addviewer":
            case "adduser":
            case "addfollower":
                if (isModUp)
                {
                    if (args.length === 2)
                    {
                        tempuser = args[1];
                        tempuser = tempuser.replace('@','');
                        u = tempuser.toLowerCase();
                       
                        currentQueuePosition = -1;
                        for (j = 0; j < queue.length; j++)
                        {
                            if (u != queue[j].toLowerCase())
                                continue;
                           
                            currentQueuePosition = j;
                            break;
                        }
                       
                        if (currentQueuePosition != -1)
                            client.say(channel, `@${tempuser} is already in the queue at position #${currentQueuePosition + 1}`);
                        else{
                          queue.push(tempuser);
                          client.say(channel, `@${tempuser} was added to the queue at position ${queue.length}.`);
                        }
                    }
                    else{
                      client.say(channel, `@${tempuser} ,Enter the viewer to add after "!queue ${args[0]}"`);
                    }
                }
                else
                  client.say(channel, `modCheck you aren't a mod modCheck`);
                break;
            case "remove":
            case "removeviewer":
            case "removeuser":
            case "removefollower":
            case "delete":
            case "deleteviewer":
            case "deleteuser":
            case "deletefollower":
            case "del":
            case "delviewer":
            case "deluser":
            case "delfollower":
                if (isModUp)
                {
                    if (args.length === 2)
                    {
                        tempuser = args[1];
                        tempuser = tempuser.replace('@','');
                        u = tempuser.toLowerCase();
                       
                        currentQueuePosition = -1;
                        for (j = 0; j < queue.length; j++)
                        {
                            if (u != queue[j].toLowerCase())
                                continue;
                           
                            currentQueuePosition = j;
                            break;
                        }
                       
                        if (currentQueuePosition != -1){
                          queue.splice(currentQueuePosition, 1);
                            client.say(channel, `${tempuser} was removed from the queue at position ${currentQueuePosition + 1}`);
                        }
                        else
                          client.say(channel, `${tempuser} is not in the current queue.`);
                    }
                    else
                      client.say(channel, `@${tags.username} ,Enter the viewer to remove after "!queue ${args[0]}"`);
                }
                else
                  client.say(channel, `You need to be a mod to do this, if you are tring to remove yourself use "!q leave".`);
                break;
                /*
            case "move":
            case "moveviewer":
            case "moveuser":
            case "movefollower":
                if (isModUp)
                {
                    if (queue.length == 0)
                        client.say(channel, `The queue is currently empty.`);
                    else if (queue.length == 1)
                        client.say(channel, `@${tags.username} Because there is only 1 viewer in the queue, it cannot be rearranged`);
                    else if (args.length === 3)
                    {
                      client.say(channel, `I have not implemented this yet :)`);
                    }
                    else
                      client.say(channel, `${tags.username} Enter the viewer to move and the new position after "!queue ${args[0]}"`);
                   
                }
                else
                  client.say(channel, `Normally modCheck , but for now unimplemented :)`);
                break;
                */
            case "join":
                if (qOpen)
                {
                    tempuser = tags.username;
                    u = tempuser.toLowerCase();
                       
                    currentQueuePosition = -1;
                    for (j = 0; j < queue.length; j++)
                    {
                        if (u != queue[j].toLowerCase())
                            continue;
                           
                        currentQueuePosition = j;
                        break;
                    }
                   
                    if (currentQueuePosition != -1)
                      client.say(channel, `@${tempuser} , You are already in the queue at position ${currentQueuePosition + 1}.`);
                    else{
                        queue.push(tempuser);
                        client.say(channel, `@${tempuser} , You were added to the queue at position ${queue.length}.`);
                    }
                }
                else
                   client.say(channel, `The queue is currently closed.`);
                break;
            case "leave":
                    tempuser = tags.username;
                    u = tempuser.toLowerCase();
                       
                    currentQueuePosition = -1;
                    for (j = 0; j < queue.length; j++)
                    {
                        if (u != queue[j].toLowerCase())
                            continue;
                           
                        currentQueuePosition = j;
                        break;
                    }
                   
                    if (currentQueuePosition != -1){
                      queue.splice(currentQueuePosition, 1);
                      client.say(channel, `@${tempuser} left the queue at position #${currentQueuePosition + 1}`);
                    }
                    else
                      client.say(channel, `@${tempuser} You are not in the queue.`);
                break;
            case "size":
            case "length":
                client.say(channel, `@${tags.username} The queue has ${queue.length} people.`);
                break;
            case "position":
            case "myposition":
                    tempuser = tags.username;
                    u = tempuser.toLowerCase();
                       
                    currentQueuePosition = -1;
                    for (j = 0; j < queue.length; j++)
                    {
                        if (u != queue[j].toLowerCase())
                            continue;
                           
                        currentQueuePosition = j;
                        break;
                    }
               
                if (currentQueuePosition != -1)
                    client.say(channel, `@${tempuser} You are at position #${currentQueuePosition + 1}`);
                else
                  client.say(channel, `@${tempuser} You are not in the queue.`);
                break;
            default:
              client.say(channel, `@${tags.username}, invalid subcommand`);
                break;
        }
    }
    else
      client.say(channel, '!q subcommands: join, leave, size, and position');
}
  else {
    if (isModUp) {
      if (args.join(' ') === 'enable' || args.join(' ') === 'on'){
        qEnabled = true;
        client.say(channel, 'Queue functions are now enabled!');
      }
      else
        client.say(channel, `Queue is currently disabled!`);
    }
    else
      client.say(channel, '-> You must be a mod to enable the queue');
}
    }
  });
