import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "../navigator/PacientesNavigator";
import { PacientesActivos } from "../interfaces/pacientesInterface";

interface Props {
    paciente: PacientesActivos;
}

export const PacientesCard = ({paciente}: Props) => {
    const widthDimension = Dimensions.get('window').width;
    
    type PacientesCardNavigationProp = StackNavigationProp<RootStackParams, 'PacienteHome'>;
    const navigation = useNavigation<PacientesCardNavigationProp>();

    return (
        <View>  
            <TouchableOpacity
                onPress={ () => navigation.navigate("PacienteHome", { paciente }) }
                activeOpacity={ 0.7 }
            >
                <View
                    style={{
                        ...style.cardContainer,
                        width: widthDimension * 0.85,
                    }}
                >
                    <View style={ style.contentWrapper }>
                        <Text
                            style={ style.nombre }
                        >
                            { paciente.nombre }
                        </Text>
                        <Text
                            style={ style.apellido }
                        >
                            { paciente.apellido }
                        </Text>
                        <View style={style.infoRow}>
                            <Text style={style.infoLabel}>Teléfono:</Text>
                            <Text style={style.infoValue}>{ paciente.telefono || "N/A" }</Text>
                        </View>
                        <View style={style.infoRow}>
                            <Text style={style.infoLabel}>Dirección:</Text>
                            <Text style={style.infoValue} numberOfLines={1}>{ paciente.direccion || "N/A" }</Text>
                        </View>
                        <View style={style.statusContainer}>
                            <Text
                                style={ style.tipoSangre }
                            >
                                { paciente.tipo_sangre }
                            </Text>
                            <Text style={[style.statusBadge, { backgroundColor: paciente.activo ? '#10B981' : '#EC4899' }]}>
                                { paciente.activo ? 'Activo' : 'Inactivo' }
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const style = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 12,
        width: 60,
        height: 240,
        marginBottom: 20,
        borderRadius: 22,
        overflow: "hidden",
        backgroundColor: '#FFFFFF',
        shadowColor: '#7C3AED',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
        elevation: 8,
        borderWidth: 1,
        borderColor: '#F0EDFF'
    },
    contentWrapper: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
        justifyContent: 'space-between'
    },
    nombre: {
        color: "#1F2937",
        fontSize: 19,
        fontWeight: "800",
        marginBottom: 6,
        lineHeight: 24,
        letterSpacing: 0.3
    },
    apellido: {
        color: "#6B7280",
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 14,
        lineHeight: 17,
        letterSpacing: 0.2
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        paddingVertical: 4,
    },
    infoLabel: {
        color: "#7C3AED",
        fontSize: 11,
        fontWeight: "700",
        textTransform: 'uppercase',
        letterSpacing: 0.4,
        flex: 0.4,
    },
    infoValue: {
        color: "#1F2937",
        fontSize: 12,
        fontWeight: "600",
        flex: 0.6,
        textAlign: 'right',
    },
    statusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#F0EDFF',
    },
    tipoSangre: {
        color: "#FFFFFF",
        backgroundColor: '#EC4899',
        fontSize: 11,
        fontWeight: "800",
        textTransform: "uppercase",
        letterSpacing: 0.6,
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 10,
        overflow: 'hidden'
    },
    statusBadge: {
        color: "#FFFFFF",
        fontSize: 10,
        fontWeight: "800",
        textTransform: "uppercase",
        letterSpacing: 0.5,
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderRadius: 8,
        overflow: 'hidden'
    }
});
