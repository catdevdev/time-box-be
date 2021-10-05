"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoxesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const warehouses_service_1 = require("../warehouses/warehouses.service");
const multer_1 = require("multer");
const path_1 = require("path");
const boxes_service_1 = require("./boxes.service");
const nanoid_1 = require("nanoid");
let BoxesController = class BoxesController {
    constructor(boxes) {
        this.boxes = boxes;
    }
    uploadFile(file, body) {
        this.boxes.addImageIntoBox(body.boxId, file.filename);
    }
};
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const fileExtName = (0, path_1.extname)(file.originalname);
                const id = (0, nanoid_1.nanoid)(50);
                cb(null, `${id}${fileExtName}`);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], BoxesController.prototype, "uploadFile", null);
BoxesController = __decorate([
    (0, common_1.Controller)('boxes'),
    __metadata("design:paramtypes", [boxes_service_1.BoxesService])
], BoxesController);
exports.BoxesController = BoxesController;
//# sourceMappingURL=boxes.controller.js.map