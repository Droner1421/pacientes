import { createDrawerNavigator } from '@react-navigation/drawer';
import { PacientesScreens } from '../screens/PacientesScreens';
import { ReporteCitasCanceladasScreen } from '../screens/ReporteCitasCanceladasScreen';
import { HomePacientesPorTipoSangreScreen } from '../screens/HomePacientesPorTipoSangreScreen';

export type HomeDrawerParams = {
    ListaPacientes: undefined;
    CitasCanceladas: undefined;
    PacientesPorTipoSangre: undefined;
};

export const HomeDrawerNavigator = () => {
    const Drawer = createDrawerNavigator<HomeDrawerParams>();

    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: true,
                headerStyle: { backgroundColor: '#7C3AED' },
                headerTintColor: 'white',
                headerTitleStyle: { fontWeight: '700', fontSize: 16 },
                drawerStyle: {
                    backgroundColor: '#1F2937',
                },
                drawerLabelStyle: { color: 'white' },
                drawerActiveTintColor: '#7C3AED',
                drawerInactiveTintColor: '#9CA3AF',
            }}
        >
            <Drawer.Screen
                name="ListaPacientes"
                component={PacientesScreens}
                options={{
                    title: 'Pacientes',
                    drawerLabel: 'Lista de Pacientes Activos',
                }}
            />
            <Drawer.Screen
                name="CitasCanceladas"
                component={ReporteCitasCanceladasScreen as any}
                options={{
                    title: 'Citas Canceladas',
                    drawerLabel: 'Contar Citas Canceladas',
                }}
            />
            <Drawer.Screen
                name="PacientesPorTipoSangre"
                component={HomePacientesPorTipoSangreScreen}
                options={{
                    title: 'Pacientes por Tipo de Sangre',
                    drawerLabel: 'Ver Pacientes por Tipo de Sangre',
                }}
            />
        </Drawer.Navigator>
    );
};
