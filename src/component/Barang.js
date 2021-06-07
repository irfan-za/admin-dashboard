import React from 'react'


 const Barang=(barangs)=>{
   console.log(barangs.barangs)
  return (
    <div>
      {barangs.barangs.map(barang=>{
                   return<tr key={barang.id}>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{barang.id}
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{barang.nama}</td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                       {barang.hargaBeli}
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{barang.harga}</td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{barang.stok}</td>
                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                     <a href="#" className="text-indigo-600 hover:text-indigo-900">
                       Edit
                     </a>
                   </td>
                 </tr>
                  })} 
    </div>
  )
}


export default Barang;