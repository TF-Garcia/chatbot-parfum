        // Função para enviar o vCard
async function sendVCard(client, chatId, name, phoneNumber) {
    // Criação do vCard
    const vCard = `
BEGIN:VCARD
VERSION:3.0
FN:${name}
TEL;TYPE=CELL:${phoneNumber}
END:VCARD`;

    // Enviar o vCard como mensagem
    await client.sendMessage(chatId, vCard, { sendMediaAsContact: true });
}

// leitor de qr code
const qrcode = require('qrcode-terminal');
const { Client, Buttons, List, MessageMedia } = require('whatsapp-web.js'); // Mudança Buttons
const client = new Client();
// serviço de leitura do qr code
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});
// apos isso ele diz que foi tudo certo
client.on('ready', () => {
    console.log('Tudo certo! WhatsApp conectado.');
});
// E inicializa tudo 
client.initialize();

const delay = ms => new Promise(res => setTimeout(res, ms)); // Função que usamos para criar o delay entre uma ação e outra

// Funil

client.on('message', async msg => {
    
    /* !!MENU!! */

    if (msg.body.match(/(menu|Menu|dia|tarde|noite|oi|Oi|Olá|olá|ola|Ola|Oii|Oie|Oiee|oii|oie|oiee|bom|Bom|Boa|perfumes|perfume|Perfume|Perfumes|saber|Saber|mais)/i) && msg.from.endsWith('@c.us')) {

        const chat = await msg.getChat();

        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        const contact = await msg.getContact(); //Pegando o contato
        const name = contact.pushname; //Pegando o nome do contato
        await client.sendMessage(msg.from,'Olá! sou o assistente virtual do Armazém do Parfum. Como posso ajudar hoje? Por favor, digite uma das opções abaixo:\nA - Catálogo de Perfumes Femininos\nB - Catálogo de Perfumes Masculinos\nC - Catálogo de Hidratantes\nD - Preços\nE - Outras perguntas'); //Primeira mensagem de texto
        await delay(3000); //delay de 3 segundos
        return;
    }
    /* !!CATÁLOGO FEMININO!! */
    if (msg.body !== null && msg.body === 'A' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Catálogo de perfumes femininos:\n1- Lady Million;\n2- Classique;\n3- Fantasy;\n4- N°5 Chanel;\n5 -J’adore;\n6- La vie est belle;\n7- Good Girl;\n8- Lily; \n9- Olimpea;\n10- Angel;\n11- Scandal;\n12- 212 Sexy;\n13- La Nuit Tresor;\n14- Dolce & Gabbana;\n15- 212 VIP Rose;\n16- Euphoria;\n17- Gabriela Sabatini;\n18- Coco Madeimoselle;\n19- Amor Amor;\n20- D&G Light Blue;\n21- Beauty;\n22- My Way;\n23- 212 NYC;\n24- Prada Candy Gloss;\n25- Hypnose;\n26- Good Girl Blush.');

        const { MessageMedia } = require('whatsapp-web.js');
        const path = require('path');
        // Defina o caminho da imagem
        const imagePath = path.join(__dirname, 'img', 'perfume-mulher.jpeg');
        // Carregue a imagem
        const media = MessageMedia.fromFilePath(imagePath); 
        // Envie a imagem
        await client.sendMessage(msg.from, media);

        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Se interessou em algum de nossos produtos? Escolha algum dos perfumes digitando o número à frente ou digite "M" para voltar ao menu.');
        return;
    }
    /* !! COMPRA DOS PERFUMES FEMININOS */
    
    const alternativasValidasM = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26'];
    const voltar = "M";
    const pagar = "P";
    const A = "A";
    if (msg.body !== null && alternativasValidasM.includes(msg.body) && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000); // delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Deseja adquirir um de nossos perfumes femininos? (Verifique se escolheu o número correto). Se sim, digite "P" para efetuar o pagamento, digite "M" para voltar ao menu principal.');
        return;
    }  

    /* !!CATÁLOGO MASCULINO!! */
    
    if (msg.body !== null && msg.body === 'B' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Catálogo de perfumes masculinos::\n1- Silver Scent;\n2- One Million;\n3- Invictus;\n4- Azzaro;\n5- Polo;\n6- Sauvage;\n7- Yves Sant Laurent;\n8- Bleu de Chanel; \n9- Bad Boy;\n10- Animale;\n11- Blast;\n12- Malbec;\n13- Joop, Nigth Flitght;\n14- Allure Homme Sport;\n15- 212 Men;\n16- Mont Blanc Legend Spirit;\n17- Dolce & Gabbana;\n18- Armani Code;\n19- Hugo Boss;\n20- Bvlgari Black;\n21- Calvin & Klein Be;\n22- Polo Black;\n23- Ferrari Black;\n24- 212 VIP Men.');

        const { MessageMedia } = require('whatsapp-web.js');
        const path = require('path');
        // Defina o caminho da imagem
        const imagePath = path.join(__dirname, 'img', 'perfume-homem.jpeg');
        // Carregue a imagem
        const media = MessageMedia.fromFilePath(imagePath); 
        // Envie a imagem
        await client.sendMessage(msg.from, media);

        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Se interessou em algum de nossos produtos? Escolha algum dos perfumes digitando o número à frente ou digite "M" para voltar ao menu.');
        return;
    }
    /* !! COMPRA DOS PERFUMES MASCULINOS */
    
    const alternativasValidasH = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'];
    
    if (msg.body !== null && alternativasValidasH.includes(msg.body) && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000); // delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Deseja adquirir um de nossos perfumes masculinos? (Verifique se escolheu o número correto). Se sim, digite "P" para efetuar o pagamento, digite "M" para voltar ao menu principal.');
        return;
    } 
    /* !!CATÁLOGO CREMES!! */
    
    if (msg.body !== null && msg.body === 'C' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Catálogo de hidratantes:\n1- 212 Sexy;\n2- 212 VIP Rose;\n3- Olimpea;\n4- N°5 Chanel;\n5- Lady Million;\n6- La vie est belle;\n7- Fadore;\n8- Fantasy; \n9- Good Girl;\n10- Scandal;\n11- La Nuit Trésor;\n12- Silver Scent;\n13- 212 Men;\n14- 212 VIP Black;\n15- Bad Boy;\n16- Bleu de Chanel;\n17- Invictus;\n18- One Million.');

        const { MessageMedia } = require('whatsapp-web.js');
        const path = require('path');
        // Defina o caminho da imagem
        const imagePath = path.join(__dirname, 'img', 'creme.jpeg');
        // Carregue a imagem
        const media = MessageMedia.fromFilePath(imagePath); 
        // Envie a imagem
        await client.sendMessage(msg.from, media);

        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Se interessou em algum de nossos produtos? Escolha algum dos perfumes digitando o número à frente ou digite "M" para voltar ao menu.');
        return;
    }
    /* !! COMPRA DOS CREMES */
    
    const alternativasValidasC = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'];
    
    if (msg.body !== null && alternativasValidasC.includes(msg.body) && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000); // delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Deseja adquirir um de nossos cremes hidratantes? (Verifique se escolheu o número correto). Se sim, digite "P" para efetuar o pagamento, digite "M" para voltar ao menu principal.');
        return;
    } if (msg.body !== null && voltar.includes(msg.body) && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();

        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Como posso ajudar? Por favor, digite uma das opções abaixo:\nA - Catálogo de Perfumes Femininos\nB - Catálogo de Perfumes Masculinos\nC - Catálogo de Hidratantes\nD - Preços\nE - Outras perguntas');
        return;
    } if (msg.body !== null && pagar.includes(msg.body) && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Estou muito feliz de que tenha optado por nossos produtos! Informe um endereço para recebimento dos produtos, de preferência residencial, e seu nome completo.');
        
        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'O pagamento pode ser realizado via Pix diretamente para esta chave: 19983063757, Rogério Luís Cardoso Carioca. Excelente dia e recomende nossos produtos. Sinta-se livre para dar feedback no número secundário.');
        return;
    } 
    /* !!PREÇOS!! */
    
    if (msg.body !== null && msg.body === 'D' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Preço dos produtos:\nPerfume 28ml - R$75,00;\nPerfume 100ml - R$190,00;\nHidratantes 120g - R$89,00.');

        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Como posso ajudar? Por favor, digite uma das opções abaixo:\n1 - Catálogo de Perfumes Femininos\n2 - Catálogo de Perfumes Masculinos\n3 - Catálogo de Hidratantes\n4 - Preços\n5 - Outras perguntas');
        return;
    }
    /* !!OUTROS!! */
    
    if (msg.body !== null && msg.body === 'E' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Lamentamos que ainda restem dúvidas. Para informações mais específicas, entre em contato com o número +55 19 99836-3814, Tomás Francisco Carvajal Garcia');
        return;
    }
});

