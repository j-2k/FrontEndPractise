import { config } from "dotenv"
config()

import { Configuration, OpenAIApi} from "openai";
import readline from "readline";

const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.API_KEY
}))

//console.log(process.env.API_KEY);

const ui = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})



//mocktest
const arrOfMessages = [
    {   role: "system", content: "Starting GPT Chat Conversation..."    }
]

console.log("Ask ChatGPT something!")
ui.prompt();
/*
ui.on("line", input => {

    const res = ({
        messages: arrOfMessages,
    })

    const newUserMsg = {
        role: "userMOCK", content: input
    }

    const newGPTMsg = {
        role: "assistantMOCK", content: "GPT MESSAGES 123"
    }
    
    arrOfMessages.push(newUserMsg)
    arrOfMessages.push(newGPTMsg)

    console.log(res.messages)

    ui.prompt()
})
*/


ui.on("line", async input => {

    const newUserMsg = {
        role: "user", content: input
    }

    arrOfMessages.push(newUserMsg);

    const res = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages:arrOfMessages,
    })

    const newGPTMsg = {
        role: "assistant", content: res.data.choices[0].message.content
    }
    console.log(res.data.choices[0].message.content);
    arrOfMessages.push(newGPTMsg);
    
    ui.prompt()
})




/*
ui.on("line", async input => {
    const res = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages:[
            {   role: "user", content: input    }
        ],
    })

    console.log(res.data.choices[0].message.content);
    ui.prompt()
})


openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages:[{
        role: "user",
        content: "Hello ChatGPT"}],
})
.then( res => {
    console.log(res.data.choices[0].message.content)
})
*/


