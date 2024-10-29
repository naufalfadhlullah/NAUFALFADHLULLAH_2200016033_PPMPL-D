from flask import Flask, jsonify, request

app = Flask(__name__)

produk = [
    {"id": 1, "nama": "Produk A", "harga": 10000},
    {"id": 2, "nama": "Produk B", "harga": 20000},
]

# Menambahkan produk baru
@app.route('/produk', methods=['POST'])
def tambah_produk():
    data = request.get_json()
    produk_baru = {
        "id": len(produk) + 1,
        "nama": data["nama"],
        "harga": data["harga"]
    }
    produk.append(produk_baru)
    return jsonify(produk_baru), 201

# Mendapatkan daftar semua produk
@app.route('/produk', methods=['GET'])
def get_produk():
    return jsonify(produk), 200

# Mendapatkan produk berdasarkan ID
@app.route('/produk/<int:id>', methods=['GET'])
def get_produk_by_id(id):
    produk_tertentu = next((item for item in produk if item["id"] == id), None)
    if produk_tertentu:
        return jsonify(produk_tertentu), 200
    else:
        return jsonify({"message": "Produk tidak ditemukan"}), 404

# Mengupdate produk berdasarkan ID
@app.route('/produk/<int:id>', methods=['PUT'])
def update_produk(id):
    data = request.get_json()
    produk_tertentu = next((item for item in produk if item["id"] == id), None)
    if produk_tertentu:
        produk_tertentu["nama"] = data.get("nama", produk_tertentu["nama"])
        produk_tertentu["harga"] = data.get("harga", produk_tertentu["harga"])
        return jsonify(produk_tertentu), 200
    else:
        return jsonify({"message": "Produk tidak ditemukan"}), 404

# Menghapus produk berdasarkan ID
@app.route('/produk/<int:id>', methods=['DELETE'])
def hapus_produk(id):
    global produk
    produk_baru = [item for item in produk if item["id"] != id]
    if len(produk) == len(produk_baru):
        return jsonify({"message": "Produk tidak ditemukan"}), 404
    produk = produk_baru
    return jsonify({"message": "Produk berhasil dihapus"}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)  