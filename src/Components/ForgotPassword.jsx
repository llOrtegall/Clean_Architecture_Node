export function ForgotPassword () {
  return (
    <>
      <section className='w-full h-screen flex flex-col items-center justify-center fondo'>
        <form className="w-96 items-center flex flex-col gap-2 justify-center bg-white p-8 rounded-lg">
          <h2 className="text-orange-600 font-semibold text-xl pb-8">Recuperar Contraseña</h2>
          <label>Usuario Registrado</label>
          <input type="text" className="p-2 rounded-md border"
            placeholder="CP*******" />
          <label>Correo Registrado</label>
          <input type="email" className="p-2 rounded-md border"
            placeholder="correo@correo.com" />
          <button className="bg-blue-400 rounded-md p-2 text-white font-semibold w-60">
            Enviar
          </button>
        </form>
      </section>
    </>

  )
}
