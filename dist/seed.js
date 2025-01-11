"use strict";
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
// src/seed.ts
require("reflect-metadata");
const data_source_1 = require("./data-source");
const User_1 = require("./entity/User");
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield data_source_1.AppDataSource.initialize();
            console.log('Data Source initialized for seeding');
            const userRepo = data_source_1.AppDataSource.getRepository(User_1.User);
            // Check if there's already a user
            const existingUser = yield userRepo.findOneBy({ businessName: 'Dev User' });
            if (!existingUser) {
                const testUser = userRepo.create({
                    businessName: 'Dev User',
                });
                yield userRepo.save(testUser);
                console.log('Seeded test user:', testUser);
            }
            else {
                console.log('Test user already exists; skipping seed.');
            }
            yield data_source_1.AppDataSource.destroy();
            console.log('Data Source closed after seeding');
        }
        catch (err) {
            console.error('Seeding failed', err);
            process.exit(1);
        }
    });
}
// Only run seed if called via CLI (not imported)
if (require.main === module) {
    seed();
}
//# sourceMappingURL=seed.js.map