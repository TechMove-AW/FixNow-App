  <table border="1px">
      <tr>
          <th>Epic / Story ID</th>
          <th>Título</th>
          <th>Descripción</th>
          <th>Criterios de Aceptación</th>
          <th>Relacionado con (Epic ID)</th>
      </tr>
      <tr>
          <td>US01</td>
          <td>Registro de Nuevo Usuario (Cliente)</td>
          <td><b>Como</b> nuevo cliente,
          <b>Quiero</b> registrarme en la plataforma
          <b>Para</b> poder buscar y contratar profesionales.</td>
          <td>
              <b>Scenario 1: Registro exitoso.</b> <br/>
              <b>Dado que</b>  soy un nuevo cliente<br/>
              <b>Cuando</b> ingreso un correo electrónico válido, una contraseña segura y mi ubicación, y acepto los términos y condiciones <br/>
              <b>Entonces</b> mi cuenta de cliente es creada.<br/>
              <br>
              <b>Scenario 2: Registro con datos inválidos </b> <br/>
              <b>Dado que</b>  soy un nuevo cliente,<br/>
              <b>Cuando</b> ingreso un correo electrónico inválido o una contraseña débil, <br/>
              <b>Entonces</b> recibo un mensaje de error indicando qué campos debo corregir.<br/>
          <td>EP01</td>
      </tr>
      <tr>
          <td>US02</td>
          <td>Registro de Nuevo Profesional Técnico</td>
          <td><b>Como</b> nuevo profesional técnico,
          <b>Quiero</b> registrarme en la plataforma detallando mis especialidades, experiencia y datos de contacto 
          <b>Para</b> para poder ofrecer mis servicios.</td>
          <td>
              <b>Scenario 1: Registro exitoso.</b> <br/>
              <b>Dado que</b> soy un nuevo profesional, <br/>
              <b>Cuando</b> ingreso mis datos personales, especialidades, años de experiencia y certificaciones (opcional), y acepto los términos y condiciones <br/>
              <b>Entonces</b> mi perfil de técnico es creado y está pendiente de verificación (si aplica).<br/>
              <br>
              <b>Scenario 2: Registro incompleto. </b> <br/>
              <b>Dado que</b> que soy un nuevo profesional,<br/>
              <b>Cuando</b>  no completo todos los campos obligatorios (ej. especialidad), <br/>
              <b>Entonces</b> recibo un mensaje indicando qué información falta.<br/>
          <td>EP01</td>
      </tr>
      <tr>
          <td>US03</td>
          <td>Editar Perfil de Usuario</td>
          <td><b>Como</b> usuario registrado (cliente o técnico),
          <b>Quiero</b> poder editar la información de mi perfil (datos de contacto, ubicación, especialidades, tarifas, etc.)
          <b>Para</b> mantenerla actualizada.</td>
          <td>
              <b>Scenario 1: Edición exitosa.</b> <br/>
              <b>Dado que</b> un usuario registrado, <br/>
              <b>Cuando</b> modifico un campo de mi perfil y guardo los cambio,<br/>
              <b>Entonces</b> a información se actualiza correctamente.<br/>
              <br>
              <b>Scenario 2: Intento de guardar datos inválidos.</b> <br/>
              <b>Dado que</b> soy un usuario registrado,<br/>
              <b>Cuando</b> intento guardar un número de teléfono con un formato incorrecto, <br/>
              <b>Entonces</b> recibo un mensaje de error.<br/>
          <td>EP01</td>
      </tr>
      <tr>
        <td>US04</td>
        <td>Buscar Profesionales por Especialidad y Ubicación</td>
        <td><b>Como</b> cliente,<br/>
            <b>Quiero</b> buscar profesionales filtrando por el tipo de servicio que necesito (ej. fontanero) y mi ubicación<br/>
            <b>Para</b> encontrar opciones cercanas.</td>
        <td>
          <b>Scenario 1: Búsqueda con resultados.</b><br/>
          <b>Dado que</b> necesito un fontanero<br/>
          <b>Cuando</b> selecciono 'fontanería' y mi ubicación<br/>
          <b>Entonces</b> veo una lista de fontaneros disponibles en mi zona.<br/><br/>
          <b>Scenario 2: Búsqueda sin resultados.</b><br/>
          <b>Dado que</b> necesito un electricista en una zona rural<br/>
          <b>Cuando</b> selecciono 'electricista' y mi ubicación, y no hay profesionales disponibles<br/>
          <b>Entonces</b> veo un mensaje indicando que no se encontraron resultados.<br/>
        </td>
        <td>EP02</td>
      </tr>
      <tr>
        <td>US05</td>
        <td>Ver Perfil Detallado del Profesional</td>
        <td><b>Como</b> cliente,<br/>
            <b>Quiero</b> ver el perfil de un profesional que incluye su experiencia, calificaciones, comentarios de otros usuarios y tarifas estimadas<br/>
            <b>Para</b> evaluar su idoneidad.</td>
        <td>
          <b>Scenario 1: Ver perfil completo.</b><br/>
          <b>Dado que</b> he encontrado un profesional en la lista de búsqueda<br/>
          <b>Cuando</b> hago clic en su nombre<br/>
          <b>Entonces</b> veo su descripción, años de experiencia, promedio de calificaciones, lista de comentarios y un rango de precios por sus servicios.<br/>
        </td>
        <td>EP02</td>
      </tr>
      <tr>
        <td>US06</td>
        <td>Contactar al Profesional</td>
        <td><b>Como</b> cliente,<br/>
            <b>Quiero</b> poder contactar directamente a un profesional a través de la plataforma (ej. enviar mensaje, solicitar cotización)<br/>
            <b>Para</b> discutir mi necesidad y coordinar el servicio.</td>
        <td>
          <b>Scenario 1: Enviar mensaje.</b><br/>
          <b>Dado que</b> estoy viendo el perfil de un profesional<br/>
          <b>Cuando</b> utilizo la función de "Enviar mensaje"<br/>
          <b>Entonces</b> mi mensaje es enviado al profesional.<br/><br/>
          <b>Scenario 2: Solicitar cotización.</b><br/>
          <b>Dado que</b> estoy viendo el perfil de un profesional<br/>
          <b>Cuando</b> utilizo la función de "Solicitar cotización"<br/>
          <b>Entonces</b> se abre un formulario para detallar mi requerimiento.
        </td>
        <td>EP02</td>
      </tr>
      <tr>
        <td>US07</td>
        <td>Configurar Perfil de Servicios</td>
        <td><b>Como</b> profesional técnico,<br/>
            <b>Quiero</b> detallar los tipos de servicios que ofrezco, mi área de cobertura, mis tarifas y mi disponibilidad horaria<br/>
            <b>Para</b> que los clientes tengan información clara.</td>
        <td>
          <b>Scenario 1: Configuración exitosa.</b><br/>
          <b>Dado que</b> soy un profesional registrado<br/>
          <b>Cuando</b> edito la sección de "Mis servicios" y guardo los cambios<br/>
          <b>Entonces</b> mi perfil de servicios se actualiza con la información proporcionada.<br/><br/>
          <b>Scenario 2: Ingreso de tarifa inválida.</b><br/>
          <b>Dado que</b> soy un profesional registrado<br/>
          <b>Cuando</b> intento guardar una tarifa con un formato no numérico<br/>
          <b>Entonces</b> recibo un mensaje de error.
        </td>
        <td>EP03</td>
      </tr>
      <tr>
        <td>US08</td>
        <td>Recibir y Gestionar Solicitudes de Servicio</td>
        <td><b>Como</b> profesional técnico,<br/>
            <b>Quiero</b> recibir notificaciones de nuevas solicitudes de servicio que coincidan con mis especialidades<br/>
            <b>Para</b> poder aceptarlas o rechazarlas.</td>
        <td>
          <b>Scenario 1: Recibir notificación.</b><br/>
          <b>Dado que</b> un cliente ha solicitado un servicio en mi área y especialidad<br/>
          <b>Entonces</b> recibo una notificación en la plataforma.<br/><br/>
          <b>Scenario 2: Aceptar solicitud.</b><br/>
          <b>Dado que</b> he recibido una solicitud<br/>
          <b>Cuando</b> la reviso y la acepto<br/>
          <b>Entonces</b> el cliente es notificado de mi aceptación y la solicitud se marca como "aceptada".<br/><br/>
          <b>Scenario 3: Rechazar solicitud.</b><br/>
          <b>Dado que</b> he recibido una solicitud que no puedo atender<br/>
          <b>Cuando</b> la reviso y la rechazo<br/>
          <b>Entonces</b> el cliente es notificado de mi rechazo.
        </td>
        <td>EP03</td>
      </tr>
      <tr>
        <td>US09</td>
        <td>Gestionar Disponibilidad</td>
        <td><b>Como</b> profesional técnico,<br/>
            <b>Quiero</b> poder indicar los días y horarios en los que estoy disponible para trabajar<br/>
            <b>Para</b> evitar recibir solicitudes cuando no pueda atenderlas.</td>
        <td>
          <b>Scenario 1: Actualizar disponibilidad.</b><br/>
          <b>Dado que</b> quiero actualizar mi horario de trabajo<br/>
          <b>Cuando</b> accedo a la sección de disponibilidad y modifico mi calendario<br/>
          <b>Entonces</b> mi disponibilidad se actualiza en la plataforma.
        </td>
        <td>EP03</td>
      </tr>
      <tr>
        <td>US10</td>
        <td>Realizar Pago del Servicio</td>
        <td><b>Como</b> cliente,<br/>
            <b>Quiero</b> poder realizar el pago de forma segura a través de la plataforma una vez que el servicio ha sido completado<br/>
            <b>Para</b> cerrar el proceso satisfactoriamente.</td>
        <td>
          <b>Scenario 1: Pago exitoso.</b><br/>
          <b>Dado que</b> el servicio ha finalizado<br/>
          <b>Cuando</b> selecciono la opción de pagar y completo la información de mi método de pago<br/>
          <b>Entonces</b> el pago se procesa correctamente y recibo una confirmación.<br/><br/>
          <b>Scenario 2: Error en el pago.</b><br/>
          <b>Dado que</b> el servicio ha finalizado<br/>
          <b>Cuando</b> intento realizar el pago con una tarjeta inválida<br/>
          <b>Entonces</b> recibo un mensaje de error indicando que el pago no pudo ser procesado.
        </td>
        <td>EP05</td>
      </tr>
      <tr>
        <td>US11</td>
        <td>Calificar y Dejar Reseña (Cliente)</td>
        <td><b>Como</b> cliente,<br/>
            <b>Quiero</b> poder calificar al profesional y dejar una reseña sobre la calidad del servicio recibido<br/>
            <b>Para</b> compartir mi experiencia con otros usuarios.</td>
        <td>
          <b>Scenario 1: Calificación y reseña exitosas.</b><br/>
          <b>Dado que</b> un servicio ha sido completado<br/>
          <b>Cuando</b> accedo a la opción de calificar, selecciono una puntuación y escribo un comentario<br/>
          <b>Entonces</b> mi calificación y reseña son guardadas y visibles para otros.<br/><br/>
          <b>Scenario 2: Calificación sin reseña.</b><br/>
          <b>Dado que</b> un servicio ha sido completado<br/>
          <b>Cuando</b> solo selecciono una calificación sin escribir un comentario<br/>
          <b>Entonces</b> la calificación es guardada.
        </td>
        <td>EP06</td>
      </tr>
      <tr>
        <td>US12</td>
        <td>Ver Calificaciones y Reseñas de Profesionales</td>
        <td><b>Como</b> cliente,<br/>
            <b>Quiero</b> ver las calificaciones promedio y las reseñas dejadas por otros clientes sobre un profesional<br/>
            <b>Para</b> tomar una decisión informada antes de contactarlo.</td>
        <td>
          <b>Scenario 1: Ver promedio y lista de reseñas.</b><br/>
          <b>Dado que</b> estoy viendo el perfil de un profesional<br/>
          <b>Entonces</b> veo su calificación promedio y una lista de las reseñas dejadas por otros clientes.
        </td>
        <td>EP06</td>
      </tr>
      <tr>
        <td>US13</td>
        <td>Calificar y Recibir Reseñas (Profesional)</td>
        <td><b>Como</b> profesional técnico,<br/>
            <b>Quiero</b> ver las calificaciones y reseñas que los clientes han dejado sobre mis servicios<br/>
            <b>Para</b> entender mi reputación en la plataforma.</td>
        <td>
          <b>Scenario 1: Ver mis calificaciones y reseñas.</b><br/>
          <b>Dado que</b> soy un profesional registrado<br/>
          <b>Cuando</b> accedo a mi perfil<br/>
          <b>Entonces</b> veo mi calificación promedio y la lista de reseñas que he recibido.
        </td>
        <td>EP06</td>
      </tr>
      <tr>
        <td>US14</td>
        <td>Suscribirse al Plan Premium</td>
        <td><b>Como</b> cliente,<br/>
            <b>Quiero</b> poder suscribirme al plan premium<br/>
            <b>Para</b> acceder a la funcionalidad de monitoreo inteligente y otros beneficios adicionales.</td>
        <td>
          <b>Scenario 1: Suscripción exitosa.</b><br/>
          <b>Dado que</b> quiero acceder al monitoreo<br/>
          <b>Cuando</b> selecciono el plan premium y completo la información de pago<br/>
          <b>Entonces</b> mi suscripción se activa.<br/><br/>
          <b>Scenario 2: Suscripción cancelada.</b><br/>
          <b>Dado que</b> quiero cancelar mi suscripción premium<br/>
          <b>Cuando</b> accedo a la sección de suscripción y confirmo la cancelación<br/>
          <b>Entonces</b> mi suscripción es dada de baja.
        </td>
        <td>EP07</td>
      </tr>
      <tr>
        <td>US15</td>
        <td>Configurar Dispositivo IoT</td>
        <td><b>Como</b> cliente con una suscripción premium,<br/>
            <b>Quiero</b> recibir instrucciones claras sobre cómo instalar y configurar el dispositivo IoT en mi hogar<br/>
            <b>Para</b> empezar a monitorear mi consumo.</td>
        <td>
          <b>Scenario 1: Ver guía de configuración.</b><br/>
          <b>Dado que</b> tengo una suscripción premium<br/>
          <b>Cuando</b> accedo a la sección de configuración del IoT<br/>
          <b>Entonces</b> veo una guía paso a paso con instrucciones y diagramas.
        </td>
        <td>EP07</td>
      </tr>
      <tr>
        <td>US16</td>
        <td>Vincular Dispositivo IoT a la Cuenta</td>
        <td><b>Como</b> cliente con el dispositivo IoT instalado,<br/>
            <b>Quiero</b> poder vincularlo a mi cuenta en la plataforma<br/>
            <b>Para</b> que los datos de consumo se asocien a mi hogar.</td>
        <td>
          <b>Scenario 1: Vinculación exitosa.</b><br/>
          <b>Dado que</b> he instalado el dispositivo<br/>
          <b>Cuando</b> ingreso el código de vinculación en la app<br/>
          <b>Entonces</b> el dispositivo se conecta a mi cuenta.
        </td>
        <td>EP07</td>
      </tr>
  </table>
