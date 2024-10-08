import { expect } from 'chai';
import { tambah, kali, kurang, bagi } from './math.js';

describe('Pengujian Fungsi aritmatika', function() {
  it('harus mengembalikan 10 saat menambahkan 5 + 5', function() {
    expect(tambah(5, 5)).to.equal(10);
  });
  it('harus mengembalikan 20 saat mengalikan 4 * 5', function() {
    expect(kali(4, 5)).to.equal(20);
  });
  it('harus mengembalikan 3 saat mengurangkan 10 - 7', function() {
    expect(kurang(10, 7)).to.equal(3);
  });
  it('harus mengembalikan 5 saat membagi 25 / 5', function() {
    expect(bagi(25, 5)).to.equal(5);
  });
  it('harus mengembalikan error saat membagi dengan 0', function() {
    expect(() => bagi(12, 0)).to.throw('Tidak bisa membagi dengan nol');
  }); //Latihan 1
  it('harus mengembalikan -5 saat mengurangkan -2 - 3', function() {
    expect(kurang(-2, 3)).to.equal(-5);
  }); //Latihan 1
  it('harus mengembalikan error saat menambahkan string dan angka', function() {
    expect(() => tambah('7', 3)).to.throw('Input harus berupa angka');
  }); //Latihan 2
  it('harus mengembalikan error saat mengalikan string dan angka', function() {
    expect(() => kali('9', 2)).to.throw('Input harus berupa angka');
  }); //Latihan 2
  it('harus mengembalikan error saat menambahkan null dan angka', function() {
    expect(() => tambah(null, 8)).to.throw('Input tidak boleh null');
  }); //Latihan 2
  it('harus mengembalikan error saat mengalikan null dan angka', function() {
    expect(() => kali(null, 6)).to.throw('Input tidak boleh null'); 
  }); 
});