export default function ContactOur() {
  return (
    <section className="py-24 bg-white min-h-1/2" id="contact">
      <div className="container px-6 mx-auto text-center">
        <h2 className="text-6xl font-bold text-gray-800 mb-8">
          Hubungi Tim Dukungan Kami
        </h2>

        <form className="max-w-lg mx-auto space-y-4">
          <select
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue="account"
          >
            <option value="" disabled>
              Apa yang Anda butuhkan bantuan?
            </option>
            <option value="account">Masalah Akun</option>
            <option value="billing">Pertanyaan Tagihan</option>
            <option value="technical">Masalah Teknis</option>
            <option value="other">Lainnya</option>
          </select>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              type="text"
              placeholder="Nama Anda e.g. Kathryn Janeway"
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email Anda e.g. janeway@gmail.com"
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="px-6 py-2 text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-md hover:from-blue-700 hover:to-indigo-700 transition duration-300"
            >
              Kirim
            </button>
            <p className="text-gray-600">Kami merespons dalam 72 jam.</p>
          </div>
        </form>
      </div>
    </section>
  );
}
