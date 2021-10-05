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
exports.BoxesService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const box_schema_1 = require("./schemas/box.schema");
const warehouse_schema_1 = require("../warehouses/schemas/warehouse.schema");
let BoxesService = class BoxesService {
    constructor(boxModel) {
        this.boxModel = boxModel;
    }
    async create(boxName, boxDescription, userId) {
        const createdBox = new this.boxModel({
            _id: new mongoose_1.Types.ObjectId(),
            name: boxName,
            description: boxDescription,
            user: userId,
        });
        return createdBox.save();
    }
    async findAll() {
        return this.boxModel.find().populate('warehouse').populate('user').exec();
    }
    async findBoxById(id) {
        return this.boxModel.findOne({ _id: id }).exec();
    }
    async addImageIntoBox(boxId, imageId) {
        const box = await this.boxModel.findByIdAndUpdate(boxId, {
            $push: { imageIds: imageId },
        });
        return box;
    }
    async addNoteIntoBox(boxId, noteTxt) {
        const box = await this.boxModel.findByIdAndUpdate(boxId, {
            $push: { notes: noteTxt },
        });
        return box;
    }
    async addPlacementForBox(boxId, placement, warehouseId) {
        return this.boxModel.findOneAndUpdate({ _id: boxId }, { placement, warehouse: warehouseId });
    }
    async closeBoxForTime(boxId, timeInSeconds) {
        var date = new Date();
        date.setSeconds(date.getSeconds() + timeInSeconds);
        return this.boxModel.findOneAndUpdate({ _id: boxId }, { dateWhenCanBeOpened: date });
    }
    async unloadBox(boxId) {
        return this.boxModel.findOneAndUpdate({ _id: boxId }, { placement: null, warehouse: null, isCanBeOpened: true });
    }
    async openBox(boxId) {
        return this.boxModel.findOneAndUpdate({ _id: boxId }, { isOpened: true });
    }
};
BoxesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(box_schema_1.Box.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], BoxesService);
exports.BoxesService = BoxesService;
//# sourceMappingURL=boxes.service.js.map