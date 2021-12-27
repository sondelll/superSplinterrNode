import mb from 'modbus-stream';

let hostAdress = '100.80.241.155';

const hundredSwitch = (pusher) => {
   if (pusher.length > 3){
      return 3;
   }
   else {
       return 2;
   }
}

const modbus = mb;

const readSensor = (storage) => {  
      modbus.tcp.connect(502,hostAdress,{debug:null,debugdate:false,debuginvert:false},(err,connection) => {
         if (err) {
            console.log(err);
            return;
         }
         connection.readHoldingRegisters({address:'0x9C40'},(err,res) => {
            if (err) {
               console.log(err);
               return;
            }
            let managedResponse = res.response.data[0].readUInt16BE().toString();
            let integerPart = managedResponse.slice(0,hundredSwitch(managedResponse));
            let decimalPart = managedResponse.at((managedResponse.length)-1);
            let managedReading = `${integerPart}.${decimalPart}`;
            storage.setItem('s1c1',managedReading);
            connection.close();
         });
   });
}

export default readSensor;