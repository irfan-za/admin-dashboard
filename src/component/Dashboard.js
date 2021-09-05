import { useEffect, useRef, useState, Fragment, useContext } from "react";
import "../style/buttonplus.css";
import { Dialog, Transition } from "@headlessui/react";
import { authh, stokBarangRef } from "../config/firebase/firebase-app";
import { UserContext } from "../provider/UserProvider";
import { findAllInRenderedTree } from "react-dom/test-utils";

function Dashboard() {
  const { currentUser } = useContext(UserContext);
  const [barangs, setBarangs] = useState([]);
  const [isBarangsLoad, setIsbarangsLoad] = useState(false);
  const tableRef = useRef(null);

  // tambah barang
  let updateStok = {};
  const tambahBarang = (e) => {
    e.preventDefault();
    const { namaBarang, hargaBeli, hargaJual, stok } = e.target.elements;
    if (
      namaBarang.value === "" ||
      hargaBeli.value === "" ||
      hargaJual.value === "" ||
      stok.value === ""
    ) {
      alert("mohon isi semua data!");
      return;
    }
    // push new data
    stokBarangRef.push(
      {
        nama: namaBarang.value,
        hargaBeli: parseInt(hargaBeli.value),
        harga: parseInt(hargaJual.value),
        stok: parseInt(stok.value),
      },
      (error) => {
        if (error) {
          alert(error);
        } else {
          closeModal();
        }
      }
    );
  };

  // Edit bararang
  const [currentNoEdit, setCurrentNoEdit] = useState(null);
  const [currentIdEdit, setCurrentIdEdit] = useState(null);
  const [inputEditBarang, setInputEditBarang] = useState(null);
  const [inputEditNamaBarang, setInputEditNamaBarang] = useState(null);
  const [kategori, setKategori] = useState(null);
  const inputEditBarangRef = useRef(null);
  const inputEditNamaBarangRef = useRef(null);

  const edit = (id, nomor) => {
    openEditModal();
    setCurrentIdEdit(id);
    setCurrentNoEdit(nomor);
  };
  useEffect(() => {
    if (
      kategori === "stok" ||
      kategori === "harga" ||
      kategori === "hargaBeli"
    ) {
      inputEditNamaBarangRef.current.classList.add("hidden");
      inputEditBarangRef.current.classList.remove("hidden");
    }
    if (kategori === "nama") {
      inputEditNamaBarangRef.current.classList.remove("hidden");
      inputEditBarangRef.current.classList.add("hidden");
    }
  }, [kategori]);
  const submitEditBarang = (e) => {
    e.preventDefault();
    if (
      kategori === "stok" ||
      kategori === "harga" ||
      kategori === "hargaBeli"
    ) {
      if ( inputEditBarang=== null) {
        alert("Silahkan masukkan data!");
      } else {
        updateStok[currentIdEdit + "/" + kategori] = parseInt(
          inputEditBarang.value
        );
        stokBarangRef.update(updateStok);
        alert("Successfully update!");
        closeEditModal();
      }
    } else if (kategori === "nama" || kategori===null) {
      if ( inputEditNamaBarang === null) {
        alert("Silahkan masukkan data!");
      } else {
        updateStok[currentIdEdit + "/" + kategori] = inputEditNamaBarang.value;
        stokBarangRef.update(updateStok);
        alert("Successfully update!");
        closeEditModal();
      }
    }
  };

  // awal Remove barang
  const [openRemove, setOpenRemove] = useState(false);
  const [currentIdRemove, setCurrentIdRemove] = useState(null);
  const [currentNoRemove, setCurrentNoRemove] = useState(null);
  const cancelButtonRef = useRef(null);
  const removeBarang = (idRemove, noRemove) => {
    setCurrentNoRemove(noRemove);
    setCurrentIdRemove(idRemove);
    setOpenRemove(true);
  };
  const submitRemoveBarang = (e) => {
    e.preventDefault();
    stokBarangRef.child(currentIdRemove).remove();
    setOpenRemove(false);
  };

  // modal togle
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  function closeEditModal() {
    setIsEditOpen(false);
  }

  function openEditModal() {
    setIsEditOpen(true);
  }
  // get data from database
  useEffect(() => {
    stokBarangRef
      .once("value")
      .then((items) => {
        if (items.exists()) {
          items.forEach((item) => {
            barangs.push({
              id: item.key,
              nama: item.val().nama,
              hargaBeli: item.val().hargaBeli,
              harga: item.val().harga,
              stok: item.val().stok,
            });
          });
        } else {
          findAllInRenderedTree("No data available");
        }
        setIsbarangsLoad(true);
      })
      .catch((err) => {
        alert(err);
      });
  }, [barangs]);
  return (
    <div className="flex justify-center">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 box-border w-full">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 pb-20">
          <h2 className="px-2 pb-6 pt-10 text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl text-center">
            Dashboard <span className="text-indigo-600">Hartop Gypsum</span>
          </h2>
          <div className=" flex justify-between my-2">
            <h2 className="text-gray-500">
              <span className="font-medium text-gray-900">User : </span>{" "}
              {currentUser.email} {currentUser.name}
            </h2>
            <button
              onClick={() => {
                authh.signOut();
              }}
              className="bg-red-200 hover:bg-red-300 font-bold py-1 px-2 text-red-600 rounded"
            >
              Logout
            </button>
          </div>
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table
              className="min-w-full divide-y divide-gray-200"
              ref={tableRef}
            >
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    No
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Id
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Nama
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Harga Beli
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Harga Jual
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Stok
                  </th>
                  <th
                    scope="col"
                    className="relative px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-indigo-500"
                  >
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>

              {isBarangsLoad ? (
                <tbody className="bg-white divide-y divide-gray-200">
                  {barangs.map((barang, index) => {
                    return (
                      <tr key={barang.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 ">
                          {barang.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {barang.nama}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {barang.hargaBeli}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {barang.harga}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {barang.stok}
                        </td>
                        <td className="px-2 py-4 whitespace-nowrap text-right text-sm font-medium flex">
                          <span
                            onClick={() => edit(barang.id, index + 1)}
                            className="text-gray-400 hover:text-indigo-600 cursor-pointer"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                          </span>

                          <span
                            onClick={() => removeBarang(barang.id, index)}
                            className="text-gray-400 hover:text-red-600 cursor-pointer"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              ) : (
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td>
                      <div className="animate-pulse flex px-6 py-4 whitespace-nowrap">
                        <div className="px-3 py-3 h-3/4 w-3/4 rounded bg-indigo-100"></div>
                      </div>
                    </td>
                    <td>
                      <div className="animate-pulse flex px-6 py-4 whitespace-nowrap">
                        <div className="px-3 py-3 h-3/4 w-3/4 rounded bg-indigo-100"></div>
                      </div>
                    </td>
                    <td>
                      <div className="animate-pulse flex px-6 py-4 whitespace-nowrap">
                        <div className="px-3 py-3 h-3/4 w-3/4 rounded bg-indigo-100"></div>
                      </div>
                    </td>
                    <td>
                      <div className="animate-pulse flex px-6 py-4 whitespace-nowrap">
                        <div className="px-3 py-3 h-3/4 w-3/4 rounded bg-indigo-100"></div>
                      </div>
                    </td>
                    <td>
                      <div className="animate-pulse flex px-6 py-4 whitespace-nowrap">
                        <div className="px-3 py-3 h-3/4 w-3/4 rounded bg-indigo-100"></div>
                      </div>
                    </td>
                    <td>
                      <div className="animate-pulse flex px-6 py-4 whitespace-nowrap">
                        <div className="px-3 py-3 h-3/4 w-3/4 rounded bg-indigo-100"></div>
                      </div>
                    </td>
                    <td>
                      <div className="animate-pulse flex px-6 py-4 whitespace-nowrap">
                        <div className="px-3 py-3 h-3/4 w-3/4 rounded bg-indigo-100"></div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="animate-pulse flex px-6 py-4 whitespace-nowrap">
                        <div className="px-3 py-3 h-3/4 w-3/4 rounded bg-indigo-100"></div>
                      </div>
                    </td>
                    <td>
                      <div className="animate-pulse flex px-6 py-4 whitespace-nowrap">
                        <div className="px-3 py-3 h-3/4 w-3/4 rounded bg-indigo-100"></div>
                      </div>
                    </td>
                    <td>
                      <div className="animate-pulse flex px-6 py-4 whitespace-nowrap">
                        <div className="px-3 py-3 h-3/4 w-3/4 rounded bg-indigo-100"></div>
                      </div>
                    </td>
                    <td>
                      <div className="animate-pulse flex px-6 py-4 whitespace-nowrap">
                        <div className="px-3 py-3 h-3/4 w-3/4 rounded bg-indigo-100"></div>
                      </div>
                    </td>
                    <td>
                      <div className="animate-pulse flex px-6 py-4 whitespace-nowrap">
                        <div className="px-3 py-3 h-3/4 w-3/4 rounded bg-indigo-100"></div>
                      </div>
                    </td>
                    <td>
                      <div className="animate-pulse flex px-6 py-4 whitespace-nowrap">
                        <div className="px-3 py-3 h-3/4 w-3/4 rounded bg-indigo-100"></div>
                      </div>
                    </td>
                    <td>
                      <div className="animate-pulse flex px-6 py-4 whitespace-nowrap">
                        <div className="px-3 py-3 h-3/4 w-3/4 rounded bg-indigo-100"></div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="animate-pulse flex px-6 py-4 whitespace-nowrap">
                        <div className="px-3 py-3 h-3/4 w-3/4 rounded bg-indigo-100"></div>
                      </div>
                    </td>
                    <td>
                      <div className="animate-pulse flex px-6 py-4 whitespace-nowrap">
                        <div className="px-3 py-3 h-3/4 w-3/4 rounded bg-indigo-100"></div>
                      </div>
                    </td>
                    <td>
                      <div className="animate-pulse flex px-6 py-4 whitespace-nowrap">
                        <div className="px-3 py-3 h-3/4 w-3/4 rounded bg-indigo-100"></div>
                      </div>
                    </td>
                    <td>
                      <div className="animate-pulse flex px-6 py-4 whitespace-nowrap">
                        <div className="px-3 py-3 h-3/4 w-3/4 rounded bg-indigo-100"></div>
                      </div>
                    </td>
                    <td>
                      <div className="animate-pulse flex px-6 py-4 whitespace-nowrap">
                        <div className="px-3 py-3 h-3/4 w-3/4 rounded bg-indigo-100"></div>
                      </div>
                    </td>
                    <td>
                      <div className="animate-pulse flex px-6 py-4 whitespace-nowrap">
                        <div className="px-3 py-3 h-3/4 w-3/4 rounded bg-indigo-100"></div>
                      </div>
                    </td>
                    <td>
                      <div className="animate-pulse flex px-6 py-4 whitespace-nowrap">
                        <div className="px-3 py-3 h-3/4 w-3/4 rounded bg-indigo-100"></div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="animate-pulse flex px-6 py-4 whitespace-nowrap">
                        <div className="px-3 py-3 h-3/4 w-3/4 rounded bg-indigo-100"></div>
                      </div>
                    </td>
                    <td>
                      <div className="animate-pulse flex px-6 py-4 whitespace-nowrap">
                        <div className="px-3 py-3 h-3/4 w-3/4 rounded bg-indigo-100"></div>
                      </div>
                    </td>
                    <td>
                      <div className="animate-pulse flex px-6 py-4 whitespace-nowrap">
                        <div className="px-3 py-3 h-3/4 w-3/4 rounded bg-indigo-100"></div>
                      </div>
                    </td>
                    <td>
                      <div className="animate-pulse flex px-6 py-4 whitespace-nowrap">
                        <div className="px-3 py-3 h-3/4 w-3/4 rounded bg-indigo-100"></div>
                      </div>
                    </td>
                    <td>
                      <div className="animate-pulse flex px-6 py-4 whitespace-nowrap">
                        <div className="px-3 py-3 h-3/4 w-3/4 rounded bg-indigo-100"></div>
                      </div>
                    </td>
                    <td>
                      <div className="animate-pulse flex px-6 py-4 whitespace-nowrap">
                        <div className="px-3 py-3 h-3/4 w-3/4 rounded bg-indigo-100"></div>
                      </div>
                    </td>
                    <td>
                      <div className="animate-pulse flex px-6 py-4 whitespace-nowrap">
                        <div className="px-3 py-3 h-3/4 w-3/4 rounded bg-indigo-100"></div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="animate-pulse flex px-6 py-4 whitespace-nowrap">
                        <div className="px-3 py-3 h-3/4 w-3/4 rounded bg-indigo-100"></div>
                      </div>
                    </td>
                    <td>
                      <div className="animate-pulse flex px-6 py-4 whitespace-nowrap">
                        <div className="px-3 py-3 h-3/4 w-3/4 rounded bg-indigo-100"></div>
                      </div>
                    </td>
                    <td>
                      <div className="animate-pulse flex px-6 py-4 whitespace-nowrap">
                        <div className="px-3 py-3 h-3/4 w-3/4 rounded bg-indigo-100"></div>
                      </div>
                    </td>
                    <td>
                      <div className="animate-pulse flex px-6 py-4 whitespace-nowrap">
                        <div className="px-3 py-3 h-3/4 w-3/4 rounded bg-indigo-100"></div>
                      </div>
                    </td>
                    <td>
                      <div className="animate-pulse flex px-6 py-4 whitespace-nowrap">
                        <div className="px-3 py-3 h-3/4 w-3/4 rounded bg-indigo-100"></div>
                      </div>
                    </td>
                    <td>
                      <div className="animate-pulse flex px-6 py-4 whitespace-nowrap">
                        <div className="px-3 py-3 h-3/4 w-3/4 rounded bg-indigo-100"></div>
                      </div>
                    </td>
                    <td>
                      <div className="animate-pulse flex px-6 py-4 whitespace-nowrap">
                        <div className="px-3 py-3 h-3/4 w-3/4 rounded bg-indigo-100"></div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
          <div>
            <button
              onClick={openModal}
              className="icon-btn add-btn fixed bottom-28 right-12"
            >
              <div className="add-icon"></div>
              <div className="btn-txt ">
                <h3 className="font-medium text-indigo-600">Add</h3>
              </div>
            </button>
          </div>
        </div>

        {/* modal FORM */}
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto "
            onClose={closeModal}
          >
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0" />
              </Transition.Child>
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl bg-white">
                  <div>
                    <Dialog.Title
                      as="h3"
                      className="text-lg flex font-medium leading-6 text-gray-700"
                    >
                      Tambah Barang ke-
                      {isBarangsLoad ? barangs.length + 1 : null}
                    </Dialog.Title>
                    <div className="mt-10 sm:mt-0">
                      <div className="mt-5 md:mt-3  md:col-span-2">
                        <form method="POST" onSubmit={tambahBarang}>
                          <div className="shadow overflow-hidden sm:rounded-md">
                            <div className="px-4 py-5 bg-white sm:p-6">
                              <div className="col-span-6 sm:col-span-3 mt-3">
                                <label
                                  htmlFor="nama_barang"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Nama Barang
                                </label>
                                <input
                                  type="text"
                                  name="namaBarang"
                                  required
                                  autoComplete="nama-barang"
                                  className="mt-1 border-b-2 border-gray-400  focus:outline-none focus:border-indigo-400 shadow rounded block w-full  sm:text-sm  "
                                />
                              </div>
                              <div className="col-span-6 sm:col-span-3 mt-3">
                                <label
                                  htmlFor="harga_beli"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Harga Beli
                                </label>
                                <input
                                  type="number"
                                  name="hargaBeli"
                                  required
                                  className="mt-1 border-b-2 border-gray-400  focus:outline-none focus:border-indigo-400 shadow rounded block w-full sm:text-sm"
                                />
                              </div>
                              <div className="col-span-6 sm:col-span-3 mt-3">
                                <label
                                  htmlFor="harga_jual"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Harga Jual
                                </label>
                                <input
                                  type="number"
                                  name="hargaJual"
                                  required
                                  className="mt-1 border-b-2 border-gray-400  focus:outline-none focus:border-indigo-400 shadow rounded block w-full sm:text-sm"
                                />
                              </div>
                              <div className="col-span-6 sm:col-span-3 mt-3">
                                <label
                                  htmlFor="stok"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Stok
                                </label>
                                <input
                                  type="number"
                                  name="stok"
                                  required
                                  className="mt-1 border-b-2 border-gray-400  focus:outline-none focus:border-indigo-400 shadow rounded block w-full sm:text-sm "
                                />
                              </div>
                            </div>
                            <div className="px-4 py-3 text-right sm:px-6">
                              <button
                                type="submit"
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="focus:outline-none focus:border-none top-3 right-5 absolute"
                    onClick={closeModal}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-700 "
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>

        {/* modal edit Barang */}
        <Transition appear show={isEditOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto "
            onClose={closeEditModal}
          >
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0" />
              </Transition.Child>
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl bg-white">
                  <div>
                    <Dialog.Title
                      as="h3"
                      className="text-lg flex font-medium leading-6 text-gray-700"
                    >
                      Edit Barang ke-{currentNoEdit}
                    </Dialog.Title>
                    <div className="mt-10 sm:mt-0">
                      <div className="mt-5 md:mt-3  md:col-span-2">
                        <form method="POST">
                          <div className="shadow overflow-hidden sm:rounded-md">
                            <div className="px-4 py-5 bg-white sm:p-6">
                              <div className="col-span-6 sm:col-span-3 flex items-center">
                                <select
                                  name="kategori"
                                  onChange={(e) => setKategori(e.target.value)}
                                  className="block text-sm font-medium text-gray-700 mr-2 border-2 rounded focus:outline-none border-indigo-400"
                                >
                                  <option value="nama">Nama Barang</option>
                                  <option value="harga">Harga Jual</option>
                                  <option value="hargaBeli">Harga Beli</option>
                                  <option value="stok">Stok</option>
                                </select>

                                <input
                                  type="text"
                                  name="inputEditNamaBarang"
                                  ref={inputEditNamaBarangRef}
                                  onChange={(e) =>
                                    setInputEditNamaBarang(e.target)
                                  }
                                  required
                                  autoComplete="editNamaBarang"
                                  className="mt-1 border-b-2 border-gray-400  focus:outline-none focus:border-indigo-400 shadow rounded block w-full sm:text-sm"
                                />
                                <input
                                  type="number"
                                  name="inputEditBarang"
                                  ref={inputEditBarangRef}
                                  onChange={(e) => setInputEditBarang(e.target)}
                                  required
                                  autoComplete="inputeditBarang"
                                  className="mt-1 border-b-2 border-gray-400  focus:outline-none focus:border-indigo-400 shadow rounded block w-full sm:text-sm hidden"
                                />
                              </div>
                            </div>
                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                              <button
                                type="submit"
                                onClick={submitEditBarang}
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="focus:outline-none focus:border-none top-3 right-5 absolute"
                    onClick={closeEditModal}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-700 "
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
        {/* modal Remove/delete Barang */}
        <Transition.Root show={openRemove} as={Fragment}>
          <Dialog
            as="div"
            static
            className="fixed z-10 inset-0 overflow-y-auto"
            initialFocus={cancelButtonRef}
            open={openRemove}
            onClose={setOpenRemove}
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          />
                        </svg>
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg leading-6 font-medium text-gray-900"
                        >
                          Hapus data barang ke-{currentNoRemove + 1}?
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure want to delete the{" "}
                            {currentNoRemove + 1} item data? Your data will be
                            permanently removed. This action cannot be undone.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={submitRemoveBarang}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setOpenRemove(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </div>
  );
}

export default Dashboard;
