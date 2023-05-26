"use client";

import Image from "next/image";
import React from "react";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

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
      <div className=" mb-10  lg:text-4xl sm:text-5xl  items-center justify-center">
        <p>
          28 Mayıs Seçimlerinin Oy Tutanaklarını Göndermek İçin Lütfen Butona
          Tıklayın
        </p>
        <br />
        <p>28 Mayıs 17:00 dan sonra fotoğraf yüklemek aktif edilecektir.</p>
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
              Oy Tutanağı Resmini Yükle
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            accept="image/*"
            multiple
            disabled
          />
        </label>
      </div>

      {/* MODAL */}
      <div
        id="small-modal"
        tabIndex={-1}
        className=" justify-center items-center  right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        style={{
          position: "absolute",
          marginRight: "%50",

          transform: "translate(-50%, -50%)",

          transition: "all 0.3s ease",

          display: isModalOpen ? "block" : "none",
        }}
      >
        <div className="relative w-full max-w-md max-h-full">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow dark:bg-white">
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-medium text-gray-900 dark:text-black text-center w-full">
                Teşekkürler
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-black"
                data-modal-hide="small-modal"
                onClick={() => setIsModalOpen(false)}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="p-6 space-y-6">
              <p className="text-base leading-relaxed text-black ">
                Gönderdiğiniz oy tutanağı resmi tarafımıza ulaşmıştır. İlgili
                yerlere iletilmek üzere kaydedilmiştir.
              </p>
            </div>
            {/* <!-- Modal footer --> */}
            <div className="flex items-center  w-full justify-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600   ">
              <button
                data-modal-hide="small-modal"
                type="button"
                className="text-black text-1xl  bg-green-400 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-400 dark:hover:bg-green-500 dark:focus:ring-blue-800"
                onClick={() => setIsModalOpen(false)}
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
