import voucherService from "../../src/services/voucherService";
import applyVoucher from "../../src/services/voucherService";
import { faker } from "@faker-js/faker";

describe('test voucher', () => {
    it('Voucher with dicount', async () => {
        const alphanum = faker.random.alphaNumeric(7);
        const amount = Number(faker.random.numeric(2));
        await voucherService.createVoucher(alphanum, amount);
        const price = Number(faker.random.numeric(3));
        const discount = amount;
        const finalAmount = price - price * (discount / 100);
        const returnObj = {
            amount: price,
            applied: true,
            discount,
            finalAmount
        }
        const voucherReturn = await voucherService.applyVoucher(alphanum, price);

        expect(voucherReturn).toStrictEqual(returnObj);
    });
    it('Voucher not applied', async () => {
        const alphanum = faker.random.alphaNumeric(7);
        const discount = Number(faker.random.numeric(1));
        await voucherService.createVoucher(alphanum, discount);
        const price = Number(faker.random.numeric(2));
        const voucherReturn = await voucherService.applyVoucher(alphanum, price);
        const objReturn = {
            amount: price,
            applied: false,
            discount,
            finalAmount: price
        }

        expect (voucherReturn).toStrictEqual(objReturn);
    })
})
