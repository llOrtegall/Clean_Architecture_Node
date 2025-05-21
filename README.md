🧱 Clean Architecture
✅ ¿Qué es?
Una arquitectura de software propuesta por Robert C. Martin (Uncle Bob) que busca:

Separar responsabilidades en capas.

Hacer que el dominio (reglas del negocio) sea el centro del sistema.

Minimizar dependencias externas en el corazón de tu app.

🏗️ Capas típicas:
Entidades: Reglas de negocio más puras.

Casos de uso: Lo que el sistema hace (aplicación).

Interfaces: Adaptadores como controladores, validaciones, API, etc.

Infraestructura: DB, frameworks, etc.

📌 Su principio clave:
"Las dependencias apuntan hacia adentro" → lo externo depende de lo interno, no al revés.

🧠 Domain-Driven Design (DDD)
✅ ¿Qué es?
Una filosofía de diseño de software creada por Eric Evans, que dice:

Modela el dominio con precisión, colaborando estrechamente con expertos del negocio.

Divide el sistema en Bounded Contexts.

Crea entidades, agregados, value objects, repositorios, etc., basados en el lenguaje del dominio.

🧩 Enfoque:
Organizar el código alrededor del significado del negocio, no de la tecnología.

🔄 ¿En qué se parecen?
Punto en común	¿Cómo se ve?
Enfocados en el dominio	Ambas priorizan que el dominio esté en el centro de la arquitectura
Separación por capas	DDD sugiere capas (dominio, aplicación, infraestructura), igual que Clean Arch
Uso de interfaces/abstracciones	Ambos desacoplan lógica del negocio de detalles técnicos (DB, APIs, etc)

🔄 ¿En qué se diferencian?
Diferencia	Clean Architecture	DDD
Enfoque principal	Estructura del sistema	Modelado del dominio (reglas del negocio)
Origen	Ingeniería de software (Robert Martin)	Diseño del negocio (Eric Evans)
Nivel de abstracción	Arquitectura general	Diseño estratégico + táctico
Bounded Contexts, Ubiquitous Language	❌ No obligatorio	✅ Esencial
Terminología (entidad, repositorio, etc.)	Genérica	Con significado específico del negocio

✅ ¿Entonces los uso juntos?
¡Sí, es lo ideal!

Clean Architecture → estructura física del sistema.

DDD → contenido lógico del dominio.

➡️ Puedes aplicar DDD dentro de una Clean Architecture.

🧠 Analogía final
Clean Architecture es como diseñar la estructura de un edificio (cómo se conectan los pisos, qué entra por dónde).

DDD es como definir para qué sirve cada habitación, según lo que necesita quien vive ahí.

PDT: he intentado implementar DDD más que Clean Architecture

