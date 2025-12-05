import { createDrawerNavigator } from '@react-navigation/drawer';
import { PacienteHomeScreen } from '../screens/PacienteHomeScreen';
import { ReporteCitasScreen } from '../screens/ReporteCitasScreen';
import { ReporteTratamientosScreen } from '../screens/ReporteTratamientosScreen';
import { ReporteCitasPorFechaScreen } from '../screens/ReporteCitasPorFechaScreen';
import { ReporteMedicamentosScreen } from '../screens/ReporteMedicamentosScreen';
import { ReportePacienteConCitasScreen } from '../screens/ReportePacienteConCitasScreen';
import { PacientesActivos } from '../interfaces/pacientesInterface';

export type PatientDrawerParams = {
    InformacionPaciente: { paciente: PacientesActivos };
    TodasLasCitas: { paciente: PacientesActivos };
    Tratamientos: { paciente: PacientesActivos };
    CitasPorFecha: { paciente: PacientesActivos };
    Medicamentos: { paciente: PacientesActivos };
    PacienteConCitas: { paciente: PacientesActivos };
};

interface PatientDrawerNavigatorProps {
    paciente: PacientesActivos;
}

export const PatientDrawerNavigator = ({ paciente }: PatientDrawerNavigatorProps) => {
    const Drawer = createDrawerNavigator<PatientDrawerParams>();

    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: true,
                headerStyle: { backgroundColor: '#7C3AED' },
                headerTintColor: 'white',
                headerTitleStyle: { fontWeight: '700', fontSize: 16 },
                headerLeft: undefined,
                drawerStyle: {
                    backgroundColor: '#1F2937',
                },
                drawerLabelStyle: { color: 'white' },
                drawerActiveTintColor: '#7C3AED',
                drawerInactiveTintColor: '#9CA3AF',
            }}
        >
            <Drawer.Screen
                name="InformacionPaciente"
                component={PacienteHomeScreen}
                options={{
                    title: 'Información General',
                    drawerLabel: 'Información General del Paciente',
                }}
                initialParams={{ paciente }}
            />
            <Drawer.Screen
                name="TodasLasCitas"
                component={ReporteCitasScreen}
                options={{
                    title: 'Citas',
                    drawerLabel: 'Ver Todas las Citas',
                }}
                initialParams={{ paciente }}
            />
            <Drawer.Screen
                name="Tratamientos"
                component={ReporteTratamientosScreen}
                options={{
                    title: 'Tratamientos',
                    drawerLabel: 'Consultar Tratamientos por Diagnóstico',
                }}
                initialParams={{ paciente }}
            />
            <Drawer.Screen
                name="CitasPorFecha"
                component={ReporteCitasPorFechaScreen}
                options={{
                    title: 'Citas por Fecha',
                    drawerLabel: 'Consultar Citas de un Día Específico',
                }}
                initialParams={{ paciente }}
            />
            <Drawer.Screen
                name="Medicamentos"
                component={ReporteMedicamentosScreen}
                options={{
                    title: 'Medicamentos',
                    drawerLabel: 'Obtener Medicamentos y Dosis',
                }}
                initialParams={{ paciente }}
            />
            <Drawer.Screen
                name="PacienteConCitas"
                component={ReportePacienteConCitasScreen}
                options={{
                    title: 'Paciente y Citas',
                    drawerLabel: 'Mostrar Paciente con sus Citas',
                }}
                initialParams={{ paciente }}
            />
        </Drawer.Navigator>
    );
};
