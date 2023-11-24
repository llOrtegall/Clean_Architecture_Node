// eslint-disable-next-line react/prop-types
export function Filters ({ onChange }) {
  const handleEstado = (event) => {
    onChange({
      Estado: event.target.value
    })
  }

  return (
    <div className=" flex justify-center bg-yellow-300 rounded-md p-2">
      <label htmlFor="estado" className="pr-2">Estado</label>
      <select name="" id="estado" onChange={handleEstado} >
        <option value="Ninguno">Ninguno</option>
        <option value="No Existe">No Existe</option>
        <option value="Si Existe">Si Existe</option>
      </select>
    </div>
  )
}
