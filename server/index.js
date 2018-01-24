import SlotMachine from './slotmachine/index';
import express from 'express';
import cors from 'cors';
const app = express();

const sm = new SlotMachine(3,2,3);

app.use(cors())
app.use("/imgs/prizes",express.static(__dirname + '/imgs/prizes'));

let router = express.Router();

router.get('/slotmachine', (req,res) => {
  sm.newRound();
  res.send(sm.round);
})

app.use('/api',router)
app.listen(3000, () => console.log('Listening on port 3000!'))