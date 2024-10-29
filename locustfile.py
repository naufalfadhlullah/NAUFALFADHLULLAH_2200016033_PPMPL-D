from locust import HttpUser, task, between

class ProdukTest(HttpUser):
    wait_time = between(1, 2)

    @task
    def lihat_semua_produk(self):
        self.client.get("/produk")

    @task
    def tambah_produk(self):
        self.client.post("/produk", json={
            "nama": "Produk C",
            "harga": 15000
        })

    @task
    def lihat_produk_by_id(self):
        self.client.get("/produk/1")

    @task
    def update_produk(self):
        self.client.put("/produk/1", json={
            "nama": "Produk A Updated",
            "harga": 12000
        })

    @task
    def hapus_produk(self):
        self.client.delete("/produk/1")