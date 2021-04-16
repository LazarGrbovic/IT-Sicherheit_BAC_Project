"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRoutes = void 0;
const common_routes_config_1 = require("../common/common.routes.config");
class UsersRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app, controller) {
        super(app, 'UsersRoutes');
        if (controller == null) {
            throw new Error("The controller cannot be null or undefined.");
        }
        this.controller = controller;
    }
    configureRoutes() {
        this.app
            .route('/user/add')
            .all((req, res, next) => {
            next();
        })
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
        return this.app;
    }
}
exports.UsersRoutes = UsersRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMucm91dGVzLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3JvdXRlcy91c2Vycy91c2Vycy5yb3V0ZXMuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlFQUFpRTtBQU1qRSxNQUFhLFdBQVksU0FBUSx5Q0FBa0I7SUFJL0MsWUFBbUIsR0FBd0IsRUFBRSxVQUEwQjtRQUNuRSxLQUFLLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBRTFCLElBQUcsVUFBVSxJQUFJLElBQUksRUFBQztZQUNsQixNQUFNLElBQUksS0FBSyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7U0FDbEU7UUFFRCxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUNqQyxDQUFDO0lBRU0sZUFBZTtRQUNsQixJQUFJLENBQUMsR0FBRzthQUNILEtBQUssQ0FBQyxXQUFXLENBQUM7YUFDbEIsR0FBRyxDQUFDLENBQUMsR0FBb0IsRUFBRSxHQUFxQixFQUFFLElBQTBCLEVBQUUsRUFBRTtZQUM3RSxJQUFJLEVBQUUsQ0FBQztRQUNYLENBQUMsQ0FBQzthQUNELElBQUksQ0FBQyxDQUFDLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxFQUFFO1lBQ2xELElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztRQUVQLElBQUksQ0FBQyxHQUFHO2FBQ0gsS0FBSyxDQUFDLGFBQWEsQ0FBQzthQUNwQixHQUFHLENBQUMsQ0FBQyxHQUFvQixFQUFFLEdBQXFCLEVBQUUsSUFBMEIsRUFBRSxFQUFFO1lBQzdFLElBQUksRUFBRSxDQUFDO1FBQ1gsQ0FBQyxDQUFDO2FBQ0QsSUFBSSxDQUFDLENBQUMsR0FBb0IsRUFBRSxHQUFxQixFQUFFLEVBQUU7WUFDbEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDbkQsQ0FBQyxDQUFDLENBQUM7UUFFUCxJQUFJLENBQUMsR0FBRzthQUNILEtBQUssQ0FBQywwQkFBMEIsQ0FBQzthQUNqQyxHQUFHLENBQUMsQ0FBQyxHQUFvQixFQUFFLEdBQXFCLEVBQUUsSUFBMEIsRUFBRSxFQUFFO1lBQzdFLElBQUksRUFBRSxDQUFDO1FBQ1gsQ0FBQyxDQUFDO2FBQ0QsR0FBRyxDQUFDLENBQUMsR0FBb0IsRUFBRSxHQUFxQixFQUFFLEVBQUU7WUFDakQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDbEQsQ0FBQyxDQUFDLENBQUM7UUFFUCxJQUFJLENBQUMsR0FBRzthQUNILEtBQUssQ0FBQyxXQUFXLENBQUM7YUFDbEIsR0FBRyxDQUFDLENBQUMsR0FBb0IsRUFBRSxHQUFxQixFQUFFLElBQTBCLEVBQUUsRUFBRTtZQUM3RSxJQUFJLEVBQUUsQ0FBQztRQUNYLENBQUMsQ0FBQzthQUNELEdBQUcsQ0FBQyxDQUFDLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxFQUFFO1lBQ2pELElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztRQUdQLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNwQixDQUFDO0NBQ0o7QUF0REQsa0NBc0RDIn0=