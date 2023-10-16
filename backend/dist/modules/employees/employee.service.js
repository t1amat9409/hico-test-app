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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const employee_1 = require("../../entity/employee");
const typeorm_2 = require("typeorm");
let EmployeeService = class EmployeeService {
    constructor(employeeRepo) {
        this.employeeRepo = employeeRepo;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.employeeRepo.find({});
            return results;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newEmployee = yield this.employeeRepo.create(data);
            newEmployee.isActive = true;
            yield this.employeeRepo.save(newEmployee);
            return newEmployee;
        });
    }
    update(guid, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const existing = yield this.getOneByGUID(guid);
            if (existing) {
                Object.keys(data).forEach((key) => {
                    if (existing[key]) {
                        existing[key] = data[key];
                    }
                });
                existing.isActive = true;
                yield this.employeeRepo.save(existing);
                return true;
            }
            return false;
        });
    }
    remove(guid) {
        return __awaiter(this, void 0, void 0, function* () {
            const existing = yield this.getOneByGUID(guid);
            if (existing) {
                existing.isActive = true;
                yield this.employeeRepo.save(existing);
                return true;
            }
            return false;
        });
    }
    getOneByEmployeeNo(employeeNo) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield this.employeeRepo.findOne({
                where: {
                    employeeNo,
                },
            });
            return employee;
        });
    }
    getOneByGUID(guid) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield this.employeeRepo.findOne({
                where: {
                    guid,
                },
            });
            return employee;
        });
    }
};
exports.EmployeeService = EmployeeService;
exports.EmployeeService = EmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(employee_1.Employee)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EmployeeService);
//# sourceMappingURL=employee.service.js.map