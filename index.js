import openai from './config/open-ai.js';
import readlineSync from 'readline-sync';
import colors from 'colors';

async function main() {
    console.log(colors.bold.green("                 << Welcome to Terminal-Chat-AI >>                 "));
    console.log(colors.bold.green("                 << Your Personalized Terminal Chatbot! >>           "));
    console.log(colors.bold.cyan("START CHATTING!"));

    //exit when terminated: 
    while(true){
        const userInput = readlineSync.question(colors.yellow('You: '));

        try{
            //call the API with user input

            const chatCompletion = await openai.chat.completions.create({
                model:'gpt-3.5-turbo',
                messages: [
                    { 
                        role: 'user',
                        content: userInput
                    }
                ]
            });

            //Get completion text/content from returned response: 
            const completionText = chatCompletion.choices[0].message.content;

            //exit condition: 
            if(userInput.toLowerCase()=='_exit_'){
                console.log(colors.green("AI-BOT: ")+ completionText);
                return;
            }

            console.log(colors.green("AI-BOT: ")+ completionText);
        }catch(error){
            console.error(colors.red(error));
        }
    } 
}

main();