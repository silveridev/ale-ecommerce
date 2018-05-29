# Ale Store ([Unicam School project](http://didattica.cs.unicam.it/doku.php?id=didattica%3Atriennale%3Apw%3Aay_1617%3Amain))

Questo è un semplice sito di e-commerce per il corso di programmazione web.

## Student

Alessandro Silveri

Student Number: 087395

## Il sistema ha già un amministratore (L’unico admin).

username/email: ale@alestore.com

pw: 12345

## Links

Github Repo: https://github.com/silveridev/ale-ecommerce

Youtube: https://www.youtube.com/watch?v=mg337KZZQng

WebSite hosted at Heroku: https://ale-store.herokuapp.com

Project Document: https://drive.google.com/open?id=1rzAy2ybKzm8Vy4GAO8c3wihBz3JdL11N

## Punti svolti:

1.  L'amministratore è in grado di accedere ad un'area privata con un
    indirizzo email e una password (primo admin già registrato);
2.  L'amministratore può gestire gli inventari;
3.  Il server invia un'email all'amministratore quando sta per terminare un prodotto;
4.  L’amministratore è in grado di creare e inserire un nuovo prodotto;
5.  Il prodotto può essere visualizzato per categorie;
6.  L'utente è in grado di cercare oggetti all'istante;
7.  È stata aggiunta l'API di Stripe per effettuare il pagamento di prova;
8.  L'utente può modificare il proprio profilo;
9.  Ogni utente ha un carrello dedicato;
10. L'utente è in grado di aggiungere e rimuovere elementi dal suo carrello
11. L'utente ha una password crittografata;
12. L'utente è in grado di visualizzare la cronologia degli acquisti;

## Architettura del progetto

Il backend è composto da NodeJS, ExpressJS e MongoDB. MongoDB è stato ospitato su mlab.com perché fornisce un servizio di hosting gratuito per MongoDB. Ho usato Mongoose per la modellazione dei dati e l'esecuzione di query per il database.

## Ruoli Utente

Gli utenti normali (clienti) possono registrarsi al sistema. La password degli utenti è stata memorizzata in modo sicuro nel database utilizzando il modulo Bcrypt. Ogni utente ha la sua sezione dedicata al carrello. Lui / lei possono aggiungere / rimuovere articoli al carrello e eseguire il checkout. La sezione di pagamento viene eseguita da Stripe, una piattaforma di pagamento sicura che facilita i pagamenti. Gli utenti possono modificare le loro informazioni personali. Inoltre, possono visualizzare la cronologia degli acquisti, tra cui nome del prodotto, prezzo e ora del pagamento.

L'amministratore può accedere a un'area privata con indirizzo email e password dell'amministratore. Può aggiungere / modificare un prodotto. Quando un prodotto sta per finire, il sistema invia automaticamente un'email all'amministratore per ricordarglielo.

## Iniziamo

Queste istruzioni forniranno una copia del progetto e sarà possibile eseguirlo in locale per scopi di sviluppo e test. Vedi la distribuzione per le note su come implementare il progetto su una piattaforma live. In questo documento uso Mac e il suo terminale per spiegare il progetto.

### Prerequisiti

Per prima cosa è necessario installare node per preparare il proprio run-time environment. É possibile scaricare node da qui. Dopo aver installato node
L'installazione di node viene fornita con il gestore di pacchetti NPM. Ora, è diventato il più grande open source libraries ecosystem al mondo. Ma in questo progetto ho usato yarn.
Yarn è un’alternativa a NPM. Ho preferito yarn a NPM principalmente perché è veloce, affidabile e sicuro.

### Installazione

Per prima cosa clonare la repo e eseguire il comando sotto riportato

Usando npm:

```
npm install
```

Usando yarn:

```
yarn install
```

## Esecuzione del progetto

Questo comando farà partire l’esecuzione de progetto.

```
yarn dev
```

## Deployment

Il progetto è già stato deployato su heroku. https://ale- store.herokuapp.com.

## Built With

* [Node](https://nodejs.org/en/) - A JavaScript runtime built on Chrome's V8 JavaScript engine.
* [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js.
* [NPM](https://www.npmjs.com/) - The largest ecosystem of open source libraries in the world.
* [YARN](https://rometools.github.io/rome/) - Fast, reliable, and secure dependency management.
* [MongoDB](https://docs.mongodb.com/) - A free and open-source cross-platform document-oriented database program.
* [Mongoose](http://mongoosejs.com/) - Elegant mongodb object modeling for node.js.
* [EJS](http://ejs.co/) - Embedded JavaScript templating.
* [Jquery](http://jquery.com/) - Query is a fast, small, and feature-rich JavaScript library.
* [Stripe](https://stripe.com/it) - The new standard in online payments.
* [Bootstarp](https://getbootstrap.com/) - Build responsive, mobile-first projects on the web with the world's most popular front-end component library.

## Author

* **Alessandro Silveri** - _Initial work_ - [Github](https://github.com/silveridev)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
