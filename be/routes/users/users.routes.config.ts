import {CommonRoutesConfig} from '../common/common.routes.config'
import * as express from 'express';
import { UserController } from '../../controller/user-controller';
import { exception } from 'console';
import debug from "debug";

export class UsersRoutes extends CommonRoutesConfig {

    private readonly controller : UserController;

    public constructor(app: express.Application, controller: UserController){
        super(app, 'UsersRoutes');

        if(controller == null){
            throw new Error("The controller cannot be null or undefined.");
        }
    
        this.controller = controller;
    }

    public configureRoutes(): express.Application {        
        this.app
            .route('/user/add')
            .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
                next();
            })            
            .post((req: express.Request, res: express.Response) => {
                this.controller.addNewUser(req, res);
            });

        this.app
            .route('/user/login')
            .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
                next();
            })
            .post((req: express.Request, res: express.Response) => {
                this.controller.verifyUserLoginAsync(req, res);
            });

        this.app
            .route('/user/username/:username')
            .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
                next();
            })
            .get((req: express.Request, res: express.Response) => {
                this.controller.getUserIdByUsername(req, res);
            });

        this.app
            .route('/user/:id')
            .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
                console.debug('In User/ID');
                next();
            })
            .put((req: express.Request, res: express.Response) => {
                this.controller.updateUser(req, res);
            });    

        return this.app;
    }
}