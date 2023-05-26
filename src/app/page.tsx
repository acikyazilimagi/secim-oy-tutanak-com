import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center mx-10 pb-10">
      <div>
        <Image
          src="/aya.jpg"
          alt="Açık Yazılım Ağı"
          width={300}
          height={300}
        ></Image>
      </div>

      <div className=" mb-10  lg:text-4xl sm:text-5xl ">
        28 Mayıs Seçimlerinin Oy Tutanaklarını Göndermek İçin Lütfen Butona
        Tıklayın
      </div>

      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2
           border-green-400 border-solid rounded-lg cursor-pointer
            bg-gray-50 dark:hover:bg-bray-800 dark:bg-white
             hover:bg-gray-100 dark:border-green-400
              dark:hover:border-green-400  dark:hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              aria-hidden="true"
              className="w-10 h-10 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              width={48}
              height={48}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <p className="mb-2  text-black font-semibold lg:text-6xl sm:text-3xl md:text-3xl">
              Oy Tutnağı Resmini Yükle
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            accept="image/*"
            multiple
          />
        </label>
      </div>
    </main>
  );
}
