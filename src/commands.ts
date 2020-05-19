import { MusicQuiz } from './music-quiz';
import { QuizArgs } from './types/quiz-args';
import { Command, CommandoClient, CommandoMessage } from "discord.js-commando"
import { Message } from "discord.js"

export class MusicQuizCommand extends Command {
    constructor(client: CommandoClient) {
        super(client, {
            name: 'music-quiz',
            memberName: 'music-quizzer',
            group: 'music',
            description: 'Music Quiz from Spotify playlists',
            guildOnly: true,
            throttling: {usages: 1, duration: 10},
            args: [
                {
                    key: 'playlist',
                    prompt: 'Which playlist to play songs from',
                    type: 'string',
                },
                {
                    key: 'songs',
                    prompt: 'How many songs the quiz will contain',
                    type: 'string',
                    default: 10
                }
            ]
        })
    }

    async run(message: CommandoMessage, args: QuizArgs, fromPattern: boolean): Promise<Message | Message[]> {
        // @ts-ignore
        if (message.guild.quiz) {
            return message.say('Quiz is already running')
        }

        // @ts-ignore
        message.guild.quiz = new MusicQuiz(message, args)
        // @ts-ignore
        message.guild.quiz.start()

        return message.say(`Hold on. Starting quiz!`)
    }
}

export class StopMusicQuizCommand extends Command {
    constructor(client: CommandoClient) {
        super(client, {
            name: 'stop-music-quiz',
            memberName: 'stop-music-quizzer',
            group: 'music',
            description: 'Stop the Music Quiz',
            guildOnly: true,
            throttling: {usages: 1, duration: 10},
            args: []
        })
    }

    async run(message: CommandoMessage, args: QuizArgs, fromPattern: boolean): Promise<Message | Message[]> {
        // @ts-ignore
        if (!message.guild.quiz) {
            return message.say(`No quiz is running`)
        }

        // @ts-ignore
        message.guild.quiz.finish()

        return message.say('Quiz stopped')
    }
}
