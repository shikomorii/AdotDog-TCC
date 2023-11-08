import React from 'react';
import { Text, ScrollView, StyleSheet, View } from 'react-native';

function TextoImportanciaDenunciaAnimais() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.text}>
          A Importância da Denúncia de Maus-Tratos a Animais
        </Text>
        <Text style={styles.paragraph}>
          Os animais compartilham nosso planeta, nossa vida e muitas vezes, nosso coração. Como seres humanos, temos uma responsabilidade moral de cuidar e proteger esses seres vulneráveis que não têm voz para se defender. Uma das maneiras mais eficazes de cumprir essa responsabilidade é denunciar atos de maus-tratos a animais sempre que os testemunhamos.
        </Text>
        <Text style={styles.paragraph}>
          Maus-tratos a animais podem assumir muitas formas horríveis. Pode ser negligência, abuso físico, abandono, exploração, envenenamento e uma série de outras ações cruéis e injustas infligidas a seres vivos inocentes. É nossa obrigação, como membros compassivos da sociedade, combater e denunciar essas práticas terríveis.
        </Text>
        <Text style={styles.paragraph}>
          Aqui estão algumas razões pelas quais a denúncia de maus-tratos a animais é de extrema importância:
        </Text>
        <Text style={styles.listItem}>
          1. Proteção dos Mais Vulneráveis: Animais são incapazes de pedir ajuda quando estão sofrendo. Eles dependem inteiramente de nós para protegê-los. Denunciar maus-tratos é a maneira de agir em nome dos indefesos.
        </Text>
        <Text style={styles.listItem}>
          2. Prevenção do Sofrimento: Ao denunciar maus-tratos, podemos intervir e impedir que um animal sofra ainda mais. Nossas ações podem salvar vidas e aliviar a dor.
        </Text>
        <Text style={styles.listItem}>
          3. Responsabilização: A denúncia de maus-tratos leva à responsabilização daqueles que cometem esses atos cruéis. Isso envia uma mensagem clara de que a sociedade não tolerará abuso contra animais.
        </Text>
        <Text style={styles.listItem}>
          4. Educação e Conscientização: Ao denunciar, também estamos educando outras pessoas sobre a importância de cuidar e proteger os animais. Isso contribui para uma mudança cultural em direção a uma sociedade mais compassiva.
        </Text>
        <Text style={styles.paragraph}>
          Você pode ajudar a combater o maus-tratos aos animais apoiando instituições dedicadas a essa causa, como a "Nome da Instituição". Eles trabalham incansavelmente para resgatar, proteger e cuidar de animais em situações de risco.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 16,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white',
  },
  paragraph: {
    marginBottom: 16,
    color: 'white',
  },
  listItem: {
    marginBottom: 8,
    marginLeft: 16,
    color: 'white',
  },
});

export default TextoImportanciaDenunciaAnimais;
