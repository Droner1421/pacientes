import requests
import json
from datetime import datetime, timedelta
import random

# Configuración de la API
API_URL = "http://192.168.100.8:3000/api"

# Datos de pacientes
pacientes_data = [
    {
        "nombre": "Juan",
        "apellido": "García",
        "fecha_nacimiento": "1985-03-15",
        "sexo": "M",
        "telefono": "1234567890",
        "email": "juan.garcia@email.com",
        "activo": True
    },
    {
        "nombre": "María",
        "apellido": "López",
        "fecha_nacimiento": "1990-07-22",
        "sexo": "F",
        "telefono": "0987654321",
        "email": "maria.lopez@email.com",
        "activo": True
    },
    {
        "nombre": "Carlos",
        "apellido": "Rodríguez",
        "fecha_nacimiento": "1978-11-08",
        "sexo": "M",
        "telefono": "5555555555",
        "email": "carlos.rodriguez@email.com",
        "activo": True
    },
    {
        "nombre": "Ana",
        "apellido": "Martínez",
        "fecha_nacimiento": "1995-05-30",
        "sexo": "F",
        "telefono": "6666666666",
        "email": "ana.martinez@email.com",
        "activo": True
    },
    {
        "nombre": "Pedro",
        "apellido": "Sánchez",
        "fecha_nacimiento": "1988-09-12",
        "sexo": "M",
        "telefono": "7777777777",
        "email": "pedro.sanchez@email.com",
        "activo": True
    }
]

# Motivos de citas
motivos_citas = [
    "Revisión general",
    "Dolor de cabeza",
    "Dolor de espalda",
    "Control de diabetes",
    "Seguimiento post-operatorio",
    "Consulta dental",
    "Revisión oftalmológica"
]

# Diagnósticos y medicamentos
diagnosticos = [
    {"diagnostico": "Hipertensión", "medicamento": "Lisinopril", "dosis": "10mg"},
    {"diagnostico": "Diabetes tipo 2", "medicamento": "Metformina", "dosis": "500mg"},
    {"diagnostico": "Colesterol alto", "medicamento": "Atorvastatina", "dosis": "20mg"},
    {"diagnostico": "Migraña", "medicamento": "Sumatriptán", "dosis": "50mg"},
    {"diagnostico": "Artritis", "medicamento": "Ibuprofeno", "dosis": "400mg"},
    {"diagnostico": "Ansiedad", "medicamento": "Sertraline", "dosis": "100mg"},
    {"diagnostico": "Insomnio", "medicamento": "Melatonina", "dosis": "5mg"}
]


def crear_pacientes():
    """Crea pacientes en la API"""
    print("Creando pacientes...")
    pacientes_ids = []
    
    for paciente in pacientes_data:
        try:
            response = requests.post(
                f"{API_URL}/pacientes",
                json=paciente,
                headers={"Content-Type": "application/json"}
            )
            if response.status_code in [200, 201]:
                data = response.json()
                paciente_id = data.get("id_paciente")
                pacientes_ids.append(paciente_id)
                print(f"✓ Paciente creado: {paciente['nombre']} {paciente['apellido']} (ID: {paciente_id})")
            else:
                print(f"✗ Error al crear paciente {paciente['nombre']}: {response.status_code}")
                print(f"  Respuesta: {response.text}")
        except Exception as e:
            print(f"✗ Error: {e}")
    
    return pacientes_ids


def crear_citas(pacientes_ids):
    """Crea citas para los pacientes"""
    print("\nCreando citas...")
    
    base_date = datetime.now()
    
    for i, paciente_id in enumerate(pacientes_ids):
        # Crear 2-3 citas por paciente
        num_citas = random.randint(2, 3)
        
        for j in range(num_citas):
            fecha_cita = base_date + timedelta(days=random.randint(1, 30))
            hora = f"{random.randint(8, 17):02d}:{random.choice(['00', '30'])}"
            
            cita_data = {
                "id_paciente": paciente_id,
                "fecha": fecha_cita.strftime("%Y-%m-%d"),
                "hora": hora,
                "motivo": random.choice(motivos_citas),
                "estatus": "pendiente"
            }
            
            try:
                response = requests.post(
                    f"{API_URL}/pacientes/citas",
                    json=cita_data,
                    headers={"Content-Type": "application/json"}
                )
                if response.status_code in [200, 201]:
                    print(f"✓ Cita creada para paciente {paciente_id}: {cita_data['fecha']} {cita_data['hora']}")
                else:
                    print(f"✗ Error al crear cita: {response.status_code}")
                    print(f"  Respuesta: {response.text}")
            except Exception as e:
                print(f"✗ Error: {e}")


def crear_tratamientos(pacientes_ids):
    """Crea tratamientos para los pacientes"""
    print("\nCreando tratamientos...")
    
    for paciente_id in pacientes_ids:
        # Crear 1-2 tratamientos por paciente
        num_tratamientos = random.randint(1, 2)
        
        for _ in range(num_tratamientos):
            trat_data = random.choice(diagnosticos)
            inicio = datetime.now() - timedelta(days=random.randint(1, 30))
            
            tratamiento_data = {
                "id_paciente": paciente_id,
                "diagnostico": trat_data["diagnostico"],
                "medicamento": trat_data["medicamento"],
                "dosis": trat_data["dosis"],
                "fecha_inicio": inicio.strftime("%Y-%m-%d")
            }
            
            try:
                response = requests.post(
                    f"{API_URL}/pacientes/tratamientos",
                    json=tratamiento_data,
                    headers={"Content-Type": "application/json"}
                )
                if response.status_code in [200, 201]:
                    print(f"✓ Tratamiento creado para paciente {paciente_id}: {tratamiento_data['diagnostico']}")
                else:
                    print(f"✗ Error al crear tratamiento: {response.status_code}")
                    print(f"  Respuesta: {response.text}")
            except Exception as e:
                print(f"✗ Error: {e}")


def main():
    """Función principal"""
    print("=" * 60)
    print("CARGANDO DATOS EN LA API DE PACIENTES")
    print("=" * 60)
    print(f"URL de la API: {API_URL}\n")
    
    try:
        # Verificar que la API está disponible
        response = requests.get(f"{API_URL}/")
        print("✓ API disponible\n")
    except Exception as e:
        print(f"✗ Error: No se puede conectar a la API en {API_URL}")
        print(f"  Asegúrate de que la aplicación NestJS está corriendo en puerto 3000")
        return
    
    # Crear datos
    pacientes_ids = crear_pacientes()
    
    if pacientes_ids:
        crear_citas(pacientes_ids)
        crear_tratamientos(pacientes_ids)
        
        print("\n" + "=" * 60)
        print("✓ ¡Datos cargados exitosamente!")
        print("=" * 60)
    else:
        print("\n✗ No se pudieron crear pacientes. Verifica la API.")


if __name__ == "__main__":
    main()
