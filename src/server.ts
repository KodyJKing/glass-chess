import express, { Request, Response } from "express"
import * as webServer from "@krisnye/glass-platform/server/webServer"
import path from "path"

// create a standard express app with a static www server and www/api handlers
const app = webServer.create(path.join(__dirname, "../"))