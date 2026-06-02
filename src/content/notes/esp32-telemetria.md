---
title: "ESP32 y telemetría: del prototipo al registro"
date: "2026-02-02"
summary: "Notas para pasar de un enlace emisor-receptor a una captura útil de datos."
tags:
  - ESP32
  - Telemetría
  - IoT
---

Un prototipo con ESP32 puede empezar con algo tan simple como enviar paquetes entre dos nodos. El salto interesante aparece cuando esos paquetes se convierten en telemetría: valores con tiempo, origen, formato y una forma clara de almacenarse.

Separar adquisición, transmisión y registro ayuda a depurar. Si el sistema falla, conviene saber si el problema está en el sensor, el enlace, el formato de mensaje o el almacenamiento.

Incluso en proyectos pequeños, una convención de nombres y un esquema de datos sencillo ahorran mucho trabajo cuando se repiten pruebas.
