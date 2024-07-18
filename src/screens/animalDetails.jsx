import PropTypes from 'prop-types';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AnimalDetails = (props) => {

    // Função para renderizar cada detalhe
    const renderDetail = (label, value,) => (
        <View style={styles.detailContainer}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    );

    return (
        <>
            <View style={styles.banner}>
                <TouchableOpacity style={styles.iconButton} onPress={() => console.log('Voltar')}>
                    <Icon name="arrow-back" size={24} color="#434343" />
                </TouchableOpacity>
                <Text style={styles.bannerText}>{props.petName}</Text>
                <TouchableOpacity style={styles.iconButton} onPress={() => console.log('Compartilhando')}>
                    <Icon name="share" size={24} color="#434343" />
                </TouchableOpacity>
            </View>
            <ScrollView>

                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: props.imageUri }}
                        style={styles.image}
                        resizeMode='center'
                    />
                </View>
                <TouchableOpacity style={styles.floatingButton} onPress={() => console.log('Editando')}>
                    <Icon name="edit" size={24} color="#434343" />
                </TouchableOpacity>
                <Text style={styles.petName}>{props.petName}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                    {renderDetail('Sexo', props.sexo)}
                    {renderDetail('Porte', props.porte)}
                    {renderDetail('Idade', props.idade)}
                </View>

                {renderDetail('Localização', props.localizacao)}
                <View style={styles.divider} />
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>

                    {renderDetail('Castrado', props.castrado ? 'Sim' : 'Não')}
                    {renderDetail('Vermifugado', props.vermifugado ? 'Sim' : 'Não')}
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                    {renderDetail('Vacinado', props.vacinado ? 'Sim' : 'Não')}
                    {renderDetail('Doenças', props.doencas ?? 'Não')}
                </View>
                <View style={styles.divider} />
                {renderDetail('Temperamento', props.temperamento)}
                <View style={styles.divider} />
                {renderDetail(` ${props.petName} Precisa de`, props.precisaDe)}
                <View style={styles.divider} />
                {renderDetail('Exigências do doador', props.exigenciasDoDoador)}
                {renderDetail(`Mais sobre ${props.petName}`, props.maisSobre)}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, { marginRight: 16 }]}>
                        <Text style={styles.buttonText}>Ver interessados</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Remover pet</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </>
    );
};

// Definindo propTypes
AnimalDetails.propTypes = {
    imageUri: PropTypes.string,
    petName: PropTypes.string,
    sexo: PropTypes.string.isRequired,
    porte: PropTypes.string.isRequired,
    idade: PropTypes.string,
    localizacao: PropTypes.string,
    castrado: PropTypes.bool,
    vermifugado: PropTypes.bool,
    vacinado: PropTypes.bool,
    doencas: PropTypes.string,
    temperamento: PropTypes.string,
    precisaDe: PropTypes.string,
    exigenciasDoDoador: PropTypes.string,
    maisSobre: PropTypes.string,
};

// Definindo defaultProps
AnimalDetails.defaultProps = {
    imageUri: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    petName: 'Pequi',
    sexo: 'Fêmea',
    porte: 'Pequeno',
    idade: '1 ano',
    localizacao: 'São Paulo, SP',
    castrado: true,
    vermifugado: true,
    vacinado: true,
    doencas: 'Diabetes',
    temperamento: 'Brincalhão e dócil',
    precisaDe: 'Ajuda financeira e alimento',
    exigenciasDoDoador: 'Termo de apadrinhamento, auxílio financeiro com alimentaçãoVisita prévia e entrevista',
    maisSobre: 'Pequi é uma cachorrinha muito dócil e brincalhona, adora correr e brincar com outros animais. Ela foi resgatada de um abrigo e precisa de um lar com muito amor e carinho. Pequi é um cão muito dócil e de fácil convivência. Adora caminhadas e se dá muito bem com crianças. Tem muito medo de raios e chuva. Está disponível para adoção pois eu e minha família o encontramos na rua e não podemos mantê-lo em nossa casa.',




    
};

export default AnimalDetails;


const styles = StyleSheet.create({
    banner: {
        width: '100%', // Largura de 360 dp
        height: 56, // Altura de 24 dp
        backgroundColor: '#cfe9e5', // Cor de fundo #88c9bf
        flexDirection: 'row', // Alinha os itens horizontalmente
        padding: 16, // Espaço à esquerda ajustado para 16dp
        justifyContent: 'space-between', // Espaçamento entre os itens
        alignItems: 'center', // Centraliza os itens verticalmente no banner
    },
    bannerText: {
        color: '#434343', // Cor do texto
        fontSize: 20, // Tamanho do texto 20pt
        fontFamily: 'Roboto_500Medium', // Fonte Roboto Medium
        textAlign: 'left',
        alignContent: 'center',
    },
    iconButton: {
        // Para um limite circular, use borderRadius com metade do tamanho (altura ou largura)
        // Para um limite quadrado, ajuste o borderRadius conforme desejado ou remova esta linha
        borderRadius: 15, // Ajuste este valor conforme necessário para circular ou quadrado
        width: 30, // Ajuste conforme necessário
        height: 30, // Ajuste conforme necessário
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent', // Ajuste a cor de fundo conforme necessário
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 'auto',
        minWidth: 360, // Largura mínima da imagem 360dp
        maxWidth: 400, // Largura da imagem 360dp
        height: 184, // Altura da imagem 184dp
    },
    petName: {
        fontFamily: 'Roboto_500Medium', // Certifique-se de que a fonte Roboto Medium está disponível
        fontWeight: 'bold',
        fontSize: 16,
        color: '#434343',
        margin: 16,
    },
    detailContainer: {
        flexDirection: 'column',
        marginHorizontal: 16,
    },
    divider: {
        borderBottomColor: '#e0e0e0', // Cor da linha divisória
        borderBottomWidth: 0.8, // Espessura da linha divisória
        marginHorizontal: 16, // Garante que a linha tenha a mesma margem lateral
        marginTop: 16, // Espaçamento acima da linha
        marginBottom: 16, // Espaçamento abaixo da linha 
    },
    label: {
        fontWeight: 'bold',
        textTransform: 'uppercase', // Transforma o texto em maiúsculas
        fontFamily: 'Roboto_400Regular', // Mudança para Roboto Regular
        fontSize: 12, // Tamanho do texto para 12px
        color: '#589b9b', // Cor do texto para #589b9b
        marginTop: 16,
        marginBottom: 8,
    },
    value: {
        fontFamily: 'Roboto_400Regular', // Define a fonte para Roboto Regular
        fontSize: 14, // Define o tamanho da fonte para 14px
        color: '#757575', // Define a cor do texto para #757575
        marginBottom: 16, // Define a margem final para 16px
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginVertical: 28,
    },
    buttonText: {
        textTransform: 'uppercase', // Transforma o texto em maiúsculas
        fontSize: 12,
        fontWeight: 'bold',
        includeFontPadding: true,
        color: '#757575',
    },
    button: {
        width: '45%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#88c9bf',
        borderWidth: 2,
        borderColor: '#88c9bf',
        boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
    },
    floatingButton: {
        width: 56, // 56dp
        height: 56, // 56dp
        backgroundColor: '#fafafa',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 28, // Metade da largura/altura para tornar o botão circular
        position: 'absolute', // Posicionamento absoluto para flutuar
        right: 20, // 20dp do lado direito da tela
        top: 160, // 20dp do fundo da tela
        elevation: 4, // Sombra para Android
        shadowColor: '#000', // Sombra para iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },

});