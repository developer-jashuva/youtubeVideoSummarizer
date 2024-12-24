import express from 'express';
import cors from "cors";
import {GoogleGenerativeAI}  from "@google/generative-ai";
import 'dotenv/config';
import getVideoCaptions from 'youtube-captions';

const app = express();
 app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy',"default-src 'self'  http://localhost:3000/ ");
    next();
});
const text = 'hello and welcome you&amp;#39;re watching race to power with me Ana data and before we start with our broadcast some breaking news coming in in a dramatic escalation of tension India is withdrawing its High Commissioner and key diplomats from Canada India says it has no faith in the current Canadian government&amp;#39;s commitment to ensure their security in a highly aggravating move Canada has named the Indian High Commissioner and other diplomats as quote unquote Persons of Interest in a murder in investigation New Delhi slamming utas investigation into the murder of a siik separatist leader hardip Singh Nidra he was designated as a terrorist by India back in 2020 and the Diplomatic standoff intensifies as India vehemently rejects Canada&amp;#39;s allegations of the Indian government&amp;#39;s involvement in the killing on Canadian soil India&amp;#39;s foreign Ministry has summoned the Canadian Char Affairs to deliver a scathing rebuke to what deems has politically motivated Witch Hunt Canada claims it has irrefutable evidence linking Indian government agents to the murder of a Canadian citizen I also had a meeting and to get us the latest our assistant editor for foreign affairs sidan siil is joining us live on this broadcast from New Delhi sidan good to see you uh this is of course a big move by New Delhi that could effectively jeopardize diplomatic relations with Ottawa what are you picking on well this is a significant Development I&amp;#39;ve seen many diplomatic developments but this is really unprecedented India not only recalling its ambassador from Canada but essentially sending a strong message to the trudo government over the playing W Bank politics now let me first tell you where I&amp;#39;m standing I&amp;#39;m standing just in front of India&amp;#39;s Ministry of external Affairs this is the place where uh the Canadian top Diplomat was summoned a short while ago and essentially uh this is the place where the top Diplomat was handed over that strongly wored deash and of course thereafter we saw uh when he came out he spoke to the media as well and reiterated of course what the Canadian government has been saying alleging Indian hand when it comes to uh the ner uh killing but essentially thereafter we saw that strongly worded statement where India announced that it is recalling its High Commissioner I do expect that there could be a strong response by the Canadian government as well it is past 8 p.m. here in India but remember it&amp;#39;s just daytime the day has just started in otwa and it could be a pretty long day we know that tensions have been simmering for some time now especially since the Canadian uh prime minister last year stood up in the Canadian Parliament and said that India is involved in uh The Killing but he hadn&amp;#39;t provided any evidence since then there had been uh two face to face uh conversations uh one as recent as in LA and also uh earlier we know that on the sidelines of the G7 Summit in Italy but essentially when it comes to the last meeting India said that it was not a very uh substantive conversation but it looks like uh now the ties are heading towards a drastic fall and coming at a time when of course Canada goes to election uh we know election happened in the country uh next year but it looks like the tudo government is pandering to the V bank politics in the country absolutely San it was just back in June the Canadian Prime Minister said that India and Canada will work together on the difficult issues it doesn&amp;#39;t seem like that&amp;#39;s going through for now sidan thank you so much for joining us on this broadcast and getting us those updates for all the latest news download the Von app And subscribe to our YouTube channel';
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
   



//https://www.youtube.com/watch?v=kqtD5dpn9C8&pp=ygUGcHl0aG9u
app.get('/',(req,res)=>{
   console.log("iam in get");
   res.send(" Dont Worry Iam Here");
  
   //http://localhost:3000/
});
app.post('/submit', async(req,res)=>{

console.log(" iam in submit");

const vi = req.body;
// console.log(vi.vi);

try {
const captions = await getVideoCaptions(vi.vi, { lang: 'en', plainText: true  });   
// console.log(captions);
                                     
const prompt = `generate summary for the following text that is fetched from a youtube video and the response sould be in some approriate hrml paragram and headings for the users .the data is: ${captions}`;
const result = await model.generateContent([prompt]);
const data = result.response.text();
 let x= data.replace(/```/g,'');
 x = x.replace('html','');
//console.log(x);
const summary = JSON.stringify({summary : x})
res.send(summary)
} catch (error) {
    const x = "<h4> unable to get summary for this video Please try another video</h4>";
    const summary = JSON.stringify({summary : x})
    res.send(summary);
    console.error(error.message)
}
});

app.listen(3000,()=>{
    console.log('iam running in localhost:3000');
    
});