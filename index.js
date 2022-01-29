#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

let playerName;

const sleep = (ms=2000) => new Promise((resolve) => setTimeout(resolve, ms));

async function welcome() {
    const welcomeTitle = chalkAnimation.rainbow(
        '\n Are you ready for some knock-knock jokes? \n'
    );
    await sleep();
    welcomeTitle.stop();

    console.log(`
    ${chalk.green("WELCOME TO YOUR LAUGHTER HELL HOLE")}
    ${chalk.blue("I am a freshly squeezed dose of Endorphins, and I will knock you out.")}
    ${chalk.blue("If you are ready to play, please enter your name.🙂")}
    `);
}

async function getPlayerName() {
    const answer = await inquirer.prompt(
        {
            name:'player_name',
            type:'input',
            message:'Enter a cool nickname:'
        }
    );

    playerName = answer.player_name;
}

async function knockknock1(){
    const answer = await inquirer.prompt(
        {
            name:'question_1',
            type:'list',
            message:'\nKnock knock!\n',
            choices:['Who\'s there?', 'Who?', 'Who is there?'],
        });

        return handleAnswer(answer.question_1 == 'Who\'s there?', 
        `${chalk.green("👍")} ${chalk.blue("moving on ...")}`,
        `${chalk.red("👎")} "Punctuations are a must,buddy" ${playerName} "😏"`
        );
}

async function knockknock2(){
    const answer = await inquirer.prompt(
        {
            name:'question_2',
            type:'list',
            message:'\nCow says.\n',
            choices:['wha?', 'Cow says who?', 'Why a cow?'],
        });

        return handleAnswer(answer.question_2 == 'Cow says who?', 
        `${chalk.green("👍")} ${chalk.blue("moving on ...")}`,
        `${chalk.red("👎")} "Are you crazy? " ${playerName} "Use your brain bro!"`
        );
}


async function winner(){
    console.log(`${chalk.black.bgBlue("\nNo, silly! A cow says Moooooooooo\n")}`);
    figlet.text(`FIN.`,  {
        font: 'Ghost',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true
    }, function(err, data){
        console.log(gradient.pastel.multiline(data) + '\n');
        console.log(chalk.blueBright(`Thanks for playing, ${playerName}! \n`));
        process.exit(0);
    });
}

async function handleAnswer(isCorrect, textSuccess, textFail) {
    const spinner = createSpinner('🤔Lemme think...');
    spinner.start();
    await sleep();

    if(isCorrect){
        spinner.success({
            text: textSuccess ,
        });
    } else {
        spinner.error({
            text: textFail
        });
            process.exit(1);
    }

}

await welcome();
await getPlayerName();
await knockknock1();
await knockknock2();
winner();