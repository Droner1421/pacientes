import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    Alert,
    Modal,
    FlatList,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFormPaciente, useFormCita, useFormTratamiento, useFormMedicamento } from "../hooks/useFormPaciente";
import { usePacientesActivos } from "../hooks/usePacientesData";

export const CrearPacienteScreen = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const [activeTab, setActiveTab] = useState<"paciente" | "tratamiento" | "medicamento" | "listar">("paciente");
    const [idPacienteCreado, setIdPacienteCreado] = useState<number | null>(null);
    const [modoEdicion, setModoEdicion] = useState<boolean>(false);
    const [itemSeleccionado, setItemSeleccionado] = useState<any>(null);

    const { pacientes, loadPacientes, isLoading: isLoadingPacientes } = usePacientesActivos();

    useEffect(() => {
        loadPacientes(true);
    }, [loadPacientes]);

    const {
        state: statePaciente,
        isLoading: isLoadingPaciente,
        handleInputChange: handlePacienteChange,
        handleSubmit: handlePacienteSubmit,
        resetForm: resetPacienteForm,
        setFormData: setPacienteFormData,
        handleDelete: deletePaciente,
    } = useFormPaciente();

    const handleCreatePaciente = async () => {
        if (!statePaciente.nombre || !statePaciente.apellido || !statePaciente.fecha_nacimiento) {
            Alert.alert("Validación", "Por favor completa los campos obligatorios");
            return;
        }

        try {
            const result = await handlePacienteSubmit();
            Alert.alert("Éxito", modoEdicion ? "Paciente actualizado correctamente" : "Paciente creado correctamente");
            setIdPacienteCreado(result.id_paciente || result.id);
            resetPacienteForm();
            setModoEdicion(false);
            setActiveTab("listar");
            await loadPacientes(true);
        } catch (error) {
            Alert.alert("Error", "No se pudo crear/actualizar el paciente");
        }
    };

    const handleEliminarPaciente = async () => {
        try {
            await deletePaciente();
            resetPacienteForm();
            setModoEdicion(false);
            setActiveTab("paciente");
            await loadPacientes(true);
        } catch (error) {
            Alert.alert("Error", "No se pudo eliminar el paciente");
        }
    };

    const handleEditarPaciente = (paciente: any) => {
        setPacienteFormData({
            id_paciente: paciente.id_paciente,
            nombre: paciente.nombre,
            apellido: paciente.apellido,
            fecha_nacimiento: paciente.fecha_nacimiento,
            sexo: paciente.sexo,
            telefono: paciente.telefono,
            direccion: paciente.direccion,
            tipo_sangre: paciente.tipo_sangre,
            alergias: paciente.alergias,
        });
        setModoEdicion(true);
        setIdPacienteCreado(paciente.id_paciente);
        setActiveTab("paciente");
    };

    const {
        state: stateTratamiento,
        isLoading: isLoadingTratamiento,
        handleInputChange: handleTratamientoChange,
        handleSubmit: handleTratamientoSubmit,
        resetForm: resetTratamientoForm,
        setFormData: setTratamientoFormData,
        handleDelete: deleteTratamiento,
    } = useFormTratamiento(idPacienteCreado || 0);

    const handleCreateTratamiento = async () => {
        if (!stateTratamiento.diagnostico || !stateTratamiento.medicamento || !stateTratamiento.dosis) {
            Alert.alert("Validación", "Por favor completa los campos obligatorios");
            return;
        }

        try {
            await handleTratamientoSubmit();
            Alert.alert("Éxito", modoEdicion ? "Tratamiento actualizado correctamente" : "Tratamiento creado correctamente");
            resetTratamientoForm();
            setModoEdicion(false);
        } catch (error) {
            Alert.alert("Error", "No se pudo crear/actualizar el tratamiento");
        }
    };

    const handleEliminarTratamiento = async () => {
        try {
            await deleteTratamiento();
            resetTratamientoForm();
            setModoEdicion(false);
        } catch (error) {
            Alert.alert("Error", "No se pudo eliminar el tratamiento");
        }
    };

    const {
        state: stateMedicamento,
        isLoading: isLoadingMedicamento,
        handleInputChange: handleMedicamentoChange,
        handleSubmit: handleMedicamentoSubmit,
        resetForm: resetMedicamentoForm,
        setFormData: setMedicamentoFormData,
        handleDelete: deleteMedicamento,
    } = useFormMedicamento(idPacienteCreado || 0);

    const handleCreateMedicamento = async () => {
        if (!stateMedicamento.medicamento || !stateMedicamento.dosis || !stateMedicamento.frecuencia) {
            Alert.alert("Validación", "Por favor completa los campos obligatorios");
            return;
        }

        try {
            await handleMedicamentoSubmit();
            Alert.alert("Éxito", modoEdicion ? "Medicamento actualizado correctamente" : "Medicamento creado correctamente");
            resetMedicamentoForm();
            setModoEdicion(false);
        } catch (error) {
            Alert.alert("Error", "No se pudo crear/actualizar el medicamento");
        }
    };

    const handleEliminarMedicamento = async () => {
        try {
            await deleteMedicamento();
            resetMedicamentoForm();
            setModoEdicion(false);
        } catch (error) {
            Alert.alert("Error", "No se pudo eliminar el medicamento");
        }
    };

    return (
        <View style={styles.root}>
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === "paciente" && styles.tabActive]}
                    onPress={() => {
                        setActiveTab("paciente");
                        resetPacienteForm();
                        setModoEdicion(false);
                    }}
                >
                    <Text style={[styles.tabText, activeTab === "paciente" && styles.tabTextActive]}>
                        Paciente
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === "tratamiento" && styles.tabActive]}
                    onPress={() => setActiveTab("tratamiento")}
                    disabled={!idPacienteCreado}
                >
                    <Text style={[styles.tabText, activeTab === "tratamiento" && styles.tabTextActive]}>
                        Tratamiento
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === "medicamento" && styles.tabActive]}
                    onPress={() => setActiveTab("medicamento")}
                    disabled={!idPacienteCreado}
                >
                    <Text style={[styles.tabText, activeTab === "medicamento" && styles.tabTextActive]}>
                        Medicamento
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === "listar" && styles.tabActive]}
                    onPress={() => setActiveTab("listar")}
                >
                    <Text style={[styles.tabText, activeTab === "listar" && styles.tabTextActive]}>
                        Listar
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                {activeTab === "paciente" && (
                    <View style={styles.container}>
                        <View style={styles.headerSection}>
                            <Text style={styles.headerTitle}>
                                {modoEdicion ? "Editar" : "Crear"} Paciente
                            </Text>
                            <Text style={styles.headerSubtitle}>
                                {modoEdicion ? "Actualiza los datos del paciente" : "Completa la información del nuevo paciente"}
                            </Text>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionLabel}>Información Básica</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Nombre *"
                                value={statePaciente.nombre}
                                onChangeText={(value) => handlePacienteChange("nombre", value)}
                                editable={!isLoadingPaciente}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Apellido *"
                                value={statePaciente.apellido}
                                onChangeText={(value) => handlePacienteChange("apellido", value)}
                                editable={!isLoadingPaciente}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Fecha de Nacimiento (YYYY-MM-DD) *"
                                value={statePaciente.fecha_nacimiento}
                                onChangeText={(value) => handlePacienteChange("fecha_nacimiento", value)}
                                editable={!isLoadingPaciente}
                            />
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionLabel}>Datos Personales</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Sexo (M/F)"
                                value={statePaciente.sexo}
                                onChangeText={(value) => handlePacienteChange("sexo", value)}
                                editable={!isLoadingPaciente}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Teléfono"
                                value={statePaciente.telefono}
                                onChangeText={(value) => handlePacienteChange("telefono", value)}
                                keyboardType="phone-pad"
                                editable={!isLoadingPaciente}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Dirección"
                                value={statePaciente.direccion}
                                onChangeText={(value) => handlePacienteChange("direccion", value)}
                                editable={!isLoadingPaciente}
                            />
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionLabel}>Información Médica</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Tipo de Sangre"
                                value={statePaciente.tipo_sangre}
                                onChangeText={(value) => handlePacienteChange("tipo_sangre", value)}
                                editable={!isLoadingPaciente}
                            />
                            <TextInput
                                style={[styles.input, styles.inputMultiline]}
                                placeholder="Alergias"
                                value={statePaciente.alergias}
                                onChangeText={(value) => handlePacienteChange("alergias", value)}
                                multiline={true}
                                numberOfLines={4}
                                editable={!isLoadingPaciente}
                            />
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonPrimary, isLoadingPaciente && styles.buttonDisabled]}
                                onPress={handleCreatePaciente}
                                disabled={isLoadingPaciente}
                            >
                                {isLoadingPaciente ? (
                                    <ActivityIndicator color="#FFF" size="small" />
                                ) : (
                                    <Text style={styles.buttonText}>
                                        {modoEdicion ? "Actualizar" : "Crear"} Paciente
                                    </Text>
                                )}
                            </TouchableOpacity>
                            
                            {modoEdicion && (
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonDanger, isLoadingPaciente && styles.buttonDisabled]}
                                    onPress={handleEliminarPaciente}
                                    disabled={isLoadingPaciente}
                                >
                                    <Text style={styles.buttonText}>Eliminar</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                        <View style={{ height: 40 }} />
                    </View>
                )}

                {activeTab === "tratamiento" && (
                    <View style={styles.container}>
                        <View style={styles.headerSection}>
                            <Text style={styles.headerTitle}>Crear Tratamiento</Text>
                            <Text style={styles.headerSubtitle}>Paciente ID: {idPacienteCreado}</Text>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionLabel}>Datos del Tratamiento</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Diagnóstico *"
                                value={stateTratamiento.diagnostico}
                                onChangeText={(value) => handleTratamientoChange("diagnostico", value)}
                                editable={!isLoadingTratamiento}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Medicamento *"
                                value={stateTratamiento.medicamento}
                                onChangeText={(value) => handleTratamientoChange("medicamento", value)}
                                editable={!isLoadingTratamiento}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Dosis *"
                                value={stateTratamiento.dosis}
                                onChangeText={(value) => handleTratamientoChange("dosis", value)}
                                editable={!isLoadingTratamiento}
                            />
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionLabel}>Fechas</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Fecha de Inicio (YYYY-MM-DD)"
                                value={stateTratamiento.fecha_inicio}
                                onChangeText={(value) => handleTratamientoChange("fecha_inicio", value)}
                                editable={!isLoadingTratamiento}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Fecha de Fin (YYYY-MM-DD)"
                                value={stateTratamiento.fecha_fin}
                                onChangeText={(value) => handleTratamientoChange("fecha_fin", value)}
                                editable={!isLoadingTratamiento}
                            />
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionLabel}>Observaciones</Text>
                            <TextInput
                                style={[styles.input, styles.inputMultiline]}
                                placeholder="Notas"
                                value={stateTratamiento.notas}
                                onChangeText={(value) => handleTratamientoChange("notas", value)}
                                multiline={true}
                                numberOfLines={4}
                                editable={!isLoadingTratamiento}
                            />
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonPrimary, isLoadingTratamiento && styles.buttonDisabled]}
                                onPress={handleCreateTratamiento}
                                disabled={isLoadingTratamiento}
                            >
                                {isLoadingTratamiento ? (
                                    <ActivityIndicator color="#FFF" size="small" />
                                ) : (
                                    <Text style={styles.buttonText}>Crear Tratamiento</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: 40 }} />
                    </View>
                )}

                {activeTab === "medicamento" && (
                    <View style={styles.container}>
                        <View style={styles.headerSection}>
                            <Text style={styles.headerTitle}>Crear Medicamento</Text>
                            <Text style={styles.headerSubtitle}>Paciente ID: {idPacienteCreado}</Text>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionLabel}>Datos del Medicamento</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Medicamento *"
                                value={stateMedicamento.medicamento}
                                onChangeText={(value) => handleMedicamentoChange("medicamento", value)}
                                editable={!isLoadingMedicamento}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Dosis *"
                                value={stateMedicamento.dosis}
                                onChangeText={(value) => handleMedicamentoChange("dosis", value)}
                                editable={!isLoadingMedicamento}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Frecuencia (Ej: cada 8 horas) *"
                                value={stateMedicamento.frecuencia}
                                onChangeText={(value) => handleMedicamentoChange("frecuencia", value)}
                                editable={!isLoadingMedicamento}
                            />
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionLabel}>Fechas</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Fecha de Inicio (YYYY-MM-DD)"
                                value={stateMedicamento.fecha_inicio}
                                onChangeText={(value) => handleMedicamentoChange("fecha_inicio", value)}
                                editable={!isLoadingMedicamento}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Fecha de Fin (YYYY-MM-DD)"
                                value={stateMedicamento.fecha_fin}
                                onChangeText={(value) => handleMedicamentoChange("fecha_fin", value)}
                                editable={!isLoadingMedicamento}
                            />
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonPrimary, isLoadingMedicamento && styles.buttonDisabled]}
                                onPress={handleCreateMedicamento}
                                disabled={isLoadingMedicamento}
                            >
                                {isLoadingMedicamento ? (
                                    <ActivityIndicator color="#FFF" size="small" />
                                ) : (
                                    <Text style={styles.buttonText}>Crear Medicamento</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: 40 }} />
                    </View>
                )}

                {activeTab === "listar" && (
                    <View style={styles.container}>
                        <View style={styles.headerSection}>
                            <Text style={styles.headerTitle}>Pacientes</Text>
                            <Text style={styles.headerSubtitle}>
                                {pacientes.length} pacientes registrados
                            </Text>
                        </View>
                        {isLoadingPacientes && pacientes.length === 0 ? (
                            <ActivityIndicator size="large" color="#3B82F6" style={{ marginTop: 20 }} />
                        ) : pacientes.length === 0 ? (
                            <Text style={styles.emptyText}>No hay pacientes registrados</Text>
                        ) : (
                            <FlatList
                                data={pacientes}
                                keyExtractor={(item, index) => `${item.id_paciente}${index}`}
                                scrollEnabled={false}
                                renderItem={({ item }) => (
                                    <View style={styles.pacienteItem}>
                                        <View style={styles.pacienteInfo}>
                                            <Text style={styles.pacienteNombre}>
                                                {item.nombre} {item.apellido}
                                            </Text>
                                            <Text style={styles.pacienteSub}>
                                                ID: {item.id_paciente} | {item.tipo_sangre}
                                            </Text>
                                            <Text style={styles.pacienteSub}>
                                                {item.telefono}
                                            </Text>
                                        </View>
                                        <View style={styles.pacienteAcciones}>
                                            <TouchableOpacity
                                                style={[styles.buttonAction, styles.editButton]}
                                                onPress={() => handleEditarPaciente(item)}
                                            >
                                                <Text style={styles.buttonActionText}>Editar</Text>
                                            </TouchableOpacity>
                                          
                                           
                                        </View>
                                    </View>
                                )}
                            />
                        )}
                        <View style={{ height: 40 }} />
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#F9F7FF",
    },
    tabContainer: {
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 2,
        borderBottomColor: "#E9D5FF",
        paddingHorizontal: 8,
        shadowColor: "#7C3AED",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    tab: {
        flex: 1,
        paddingVertical: 14,
        alignItems: "center",
        borderBottomWidth: 3,
        borderBottomColor: "transparent",
    },
    tabActive: {
        borderBottomColor: "#7C3AED",
    },
    tabText: {
        fontSize: 13,
        fontWeight: "700",
        color: "#9CA3AF",
        letterSpacing: 0.3
    },
    tabTextActive: {
        color: "#7C3AED",
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    container: {
        paddingBottom: 40,
    },
    headerSection: {
        marginBottom: 24,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#E9D5FF",
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "800",
        color: "#1F2937",
        marginBottom: 6,
        letterSpacing: -0.5,
    },
    headerSubtitle: {
        fontSize: 13,
        fontWeight: "500",
        color: "#6B7280",
        letterSpacing: 0.2,
    },
    section: {
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        padding: 16,
        marginBottom: 16,
        borderTopWidth: 3,
        borderTopColor: "#EC4899",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    sectionLabel: {
        fontSize: 12,
        fontWeight: "800",
        color: "#6B7280",
        marginBottom: 14,
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    input: {
        borderWidth: 2,
        borderColor: "#E9D5FF",
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 11,
        marginBottom: 12,
        fontSize: 14,
        color: "#1F2937",
        backgroundColor: "#FAFBFC",
        fontWeight: "500"
    },
    inputMultiline: {
        height: 90,
        paddingTop: 11,
        textAlignVertical: "top",
        marginBottom: 0,
    },
    buttonContainer: {
        flexDirection: "row",
        gap: 10,
        marginTop: 24,
    },
    button: {
        borderRadius: 11,
        paddingVertical: 14,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 3,
    },
    buttonPrimary: {
        backgroundColor: "#7C3AED",
    },
    buttonDanger: {
        backgroundColor: "#EC4899",
    },
    buttonDisabled: {
        backgroundColor: "#9CA3AF",
        opacity: 0.6,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 14,
        fontWeight: "800",
        letterSpacing: 0.3
    },
    formContainer: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
        borderTopWidth: 5,
        borderTopColor: "#7C3AED",
        shadowColor: "#7C3AED",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
        elevation: 4,
    },
    formTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: "#1F2937",
        marginBottom: 20,
        letterSpacing: 0.4
    },
    infoText: {
        fontSize: 13,
        color: "#6B7280",
        marginBottom: 12,
        fontStyle: "italic",
        fontWeight: "500"
    },
    inputMultilineOld: {
        height: 100,
        paddingTop: 12,
        textAlignVertical: "top",
    },
    buttonOld: {
        backgroundColor: "#7C3AED",
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: "center",
        marginTop: 16,
        shadowColor: "#7C3AED",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 3,
    },
    buttonRow: {
        flexDirection: "row",
        gap: 10,
        marginTop: 16,
    },
    buttonFlex: {
        flex: 1,
    },
    buttonDelete: {
        backgroundColor: "#EC4899",
    },
    pacienteItem: {
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        padding: 14,
        marginBottom: 14,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderLeftWidth: 5,
        borderLeftColor: "#7C3AED",
        shadowColor: "#7C3AED",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 2,
    },
    pacienteInfo: {
        flex: 1,
    },
    pacienteNombre: {
        fontSize: 14,
        fontWeight: "800",
        color: "#1F2937",
        marginBottom: 4,
        letterSpacing: 0.2
    },
    pacienteSub: {
        fontSize: 12,
        color: "#6B7280",
        marginBottom: 2,
        fontWeight: "500"
    },
    pacienteAcciones: {
        flexDirection: "row",
        gap: 8,
    },
    buttonAction: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        alignItems: "center",
    },
    editButton: {
        backgroundColor: "#7C3AED",
    },
    deleteButton: {
        backgroundColor: "#EC4899",
    },
    buttonActionText: {
        color: "#FFF",
        fontSize: 11,
        fontWeight: "700",
        letterSpacing: 0.2
    },
    emptyText: {
        fontSize: 14,
        color: "#6B7280",
        textAlign: "center",
        marginTop: 32,
        fontStyle: "italic",
        fontWeight: "500"
    },
});
