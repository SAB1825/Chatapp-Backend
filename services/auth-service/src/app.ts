import express, { Application } from "express"

export const CreateApp =  () : Application => {
    const app = express()

    return app
}