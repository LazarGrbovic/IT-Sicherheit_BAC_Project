"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRoutes = void 0;
const common_routes_config_1 = require("../common/common.routes.config");
class UsersRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app, controller) {
        super(app, 'UsersRoutes');
        if (controller == null) {
            // throw new exception("The controller cannot be null or undefined.");
        }
        this.controller = controller;
    }
    configureRoutes() {
        this.app
            .route('/user/add')
            .all((req, res, next) => {
            next();
        })
            // .get((req: express.Request, res: express.Response) => {     
            //     debug.log("[users.routes.config.ts] Inside GET /users");           
            //     this.controller.getAllUsersAsync(req, res);
            // })
            .post((req, res) => {
            this.controller.addNewUser(req, res);
        });
        this.app
            .route('/user/login')
            .all((req, res, next) => {
            next();
        })
            .post((req, res) => {
            this.controller.verifyUserLoginAsync(req, res);
        });
        this.app
            .route('/user/username/:username')
            .all((req, res, next) => {
            next();
        })
            .get((req, res) => {
            this.controller.getUserIdByUsername(req, res);
        });
        this.app
            .route('/user/:id')
            .all((req, res, next) => {
            next();
        })
            .put((req, res) => {
            this.controller.updateUser(req, res);
        });
        // this.app
        //     .route('/user/id/:id')
        //     .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
        //         next();
        //     })
        //     .get((req: express.Request, res: express.Response) => {
        //         this.controller.getUserIdByUsername(req, res);
        //     })
        return this.app;
    }
}
exports.UsersRoutes = UsersRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMucm91dGVzLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3JvdXRlcy91c2Vycy91c2Vycy5yb3V0ZXMuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlFQUFpRTtBQU1qRSxNQUFhLFdBQVksU0FBUSx5Q0FBa0I7SUFJL0MsWUFBbUIsR0FBd0IsRUFBRSxVQUEwQjtRQUNuRSxLQUFLLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBRTFCLElBQUcsVUFBVSxJQUFJLElBQUksRUFBQztZQUNsQixzRUFBc0U7U0FDekU7UUFFRCxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUNqQyxDQUFDO0lBRU0sZUFBZTtRQUNsQixJQUFJLENBQUMsR0FBRzthQUNILEtBQUssQ0FBQyxXQUFXLENBQUM7YUFDbEIsR0FBRyxDQUFDLENBQUMsR0FBb0IsRUFBRSxHQUFxQixFQUFFLElBQTBCLEVBQUUsRUFBRTtZQUM3RSxJQUFJLEVBQUUsQ0FBQztRQUNYLENBQUMsQ0FBQztZQUNGLCtEQUErRDtZQUMvRCwwRUFBMEU7WUFDMUUsa0RBQWtEO1lBQ2xELEtBQUs7YUFDSixJQUFJLENBQUMsQ0FBQyxHQUFvQixFQUFFLEdBQXFCLEVBQUUsRUFBRTtZQUNsRCxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7UUFFUCxJQUFJLENBQUMsR0FBRzthQUNILEtBQUssQ0FBQyxhQUFhLENBQUM7YUFDcEIsR0FBRyxDQUFDLENBQUMsR0FBb0IsRUFBRSxHQUFxQixFQUFFLElBQTBCLEVBQUUsRUFBRTtZQUM3RSxJQUFJLEVBQUUsQ0FBQztRQUNYLENBQUMsQ0FBQzthQUNELElBQUksQ0FBQyxDQUFDLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxFQUFFO1lBQ2xELElBQUksQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ25ELENBQUMsQ0FBQyxDQUFDO1FBRVAsSUFBSSxDQUFDLEdBQUc7YUFDSCxLQUFLLENBQUMsMEJBQTBCLENBQUM7YUFDakMsR0FBRyxDQUFDLENBQUMsR0FBb0IsRUFBRSxHQUFxQixFQUFFLElBQTBCLEVBQUUsRUFBRTtZQUM3RSxJQUFJLEVBQUUsQ0FBQztRQUNYLENBQUMsQ0FBQzthQUNELEdBQUcsQ0FBQyxDQUFDLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxFQUFFO1lBQ2pELElBQUksQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2xELENBQUMsQ0FBQyxDQUFDO1FBRVAsSUFBSSxDQUFDLEdBQUc7YUFDSCxLQUFLLENBQUMsV0FBVyxDQUFDO2FBQ2xCLEdBQUcsQ0FBQyxDQUFDLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxJQUEwQixFQUFFLEVBQUU7WUFDN0UsSUFBSSxFQUFFLENBQUM7UUFDWCxDQUFDLENBQUM7YUFDRCxHQUFHLENBQUMsQ0FBQyxHQUFvQixFQUFFLEdBQXFCLEVBQUUsRUFBRTtZQUNqRCxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7UUFFUCxXQUFXO1FBQ1gsNkJBQTZCO1FBQzdCLDBGQUEwRjtRQUMxRixrQkFBa0I7UUFDbEIsU0FBUztRQUNULDhEQUE4RDtRQUM5RCx5REFBeUQ7UUFDekQsU0FBUztRQUdULE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNwQixDQUFDO0NBQ0o7QUFuRUQsa0NBbUVDIn0=