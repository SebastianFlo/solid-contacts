<template>
    <div id="rdflib-view">
        <div class="rdflib-view-title">
            <h1>Rdflib {{ searchId }}</h1>
        </div>
    </div>
</template>

<script>
    import * as $rdf from 'rdflib';

    export default {
        name: 'rdflib',
        data: function () {
            return {
                searchId: '1'
            };
        },
        mounted() {
            // const store = $rdf.graph();
            // // eslint-disable-next-line
            // console.log('store', store);

            // const me = store.sym('https://example.com/alice/card#me');
            // // eslint-disable-next-line
            // console.log('me', me);

            // const profile = me.doc();
            // // eslint-disable-next-line
            // console.log('profile', profile);

            // const VCARD = new $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');
            // // eslint-disable-next-line
            // console.log('VCARD', VCARD('fn'));

            // store.add(me, VCARD('fn'), 'John Bloggs', profile);
            // // eslint-disable-next-line
            // console.log('store', store);

            // let name = store.any(me, VCARD('name'), null, profile);
            // // eslint-disable-next-line
            // console.log('name', name);

            // name = store.any(me, VCARD('name'));
            // // eslint-disable-next-line
            // console.log('name', name);

            // // === With Turtle

            // let text = '<#this>  a  <#Example> .';
            // let doc = $rdf.sym('https://example.com/alice/card');

            // let storeTurtle = $rdf.graph();

            // $rdf.parse(text, storeTurtle, doc.uri, 'text/turtle');  // pass base URI
            // // eslint-disable-next-line
            // console.log('storeTurtle.toNT', storeTurtle.toNT());

            // // eslint-disable-next-line
            // console.log('$rdf.serialize', $rdf.serialize(doc, storeTurtle, doc.uri, 'text/turtle'));

            // // === Search the store
            // let quads = storeTurtle.match();
            // // eslint-disable-next-line
            // console.log('quads', quads);

            // quads = storeTurtle.match(null, null, null, doc);
            // // eslint-disable-next-line
            // console.log('quads', quads);

            // quads = storeTurtle.match(null, null, null, me.doc());
            // // eslint-disable-next-line
            // console.log('quads', quads);

            // quads = storeTurtle.match(null, null, me, me.doc());
            // // eslint-disable-next-line
            // console.log('quads', quads);


            // let oldEmail = $rdf.sym('mailto:albert@example.com')
            // // eslint-disable-next-line
            // console.log('oldEmail', oldEmail);

            // let outOfDate = storeTurtle.match(null, null, oldEmail, null).map(st => st.why);
            // // eslint-disable-next-line
            // console.log('outOfDate', outOfDate);

            // let mentions = storeTurtle.match(me, null, null, null).concat(store.match(null, null, me, null)).map(st => st.why);
            // // eslint-disable-next-line
            // console.log('mentions', mentions);

            // let aboutAlice = store.connectedStatements(me, me.doc());
            // // eslint-disable-next-line
            // console.log('aboutAlice', aboutAlice);

            // // eslint-disable-next-line
            // // store.match(null, LDP('contains')).forEach(st => {console.log(st.subject + 'contains' + st.object)});

            // const FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');
            // let st = $rdf.st(me, FOAF('name'), 'Sebastian Florian', me.doc());
            // // eslint-disable-next-line
            // console.log('st', st);

            // // Using the fetcher //
            // const storeFetcher = $rdf.graph();
            // const meFetcher = storeFetcher.sym('https://seb.solid.community/profile/card#me');
            // const profileFetcher = meFetcher.doc() //    i.e. store.sym(''https://example.com/alice/card#me');
            // // const VCARDFetcher = new $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');
            // const fetcherFetcher =new $rdf.Fetcher(storeFetcher);

            // fetcherFetcher.load(profileFetcher).then(response => {
            //         if (!response) {
            //             return;
            //         }

            //         let name = storeFetcher.any(me, VCARD('fn')) || store.any(me, FOAF('name'));
            //         let org = storeFetcher.any(me, VCARD('fn')) || store.any(me, FOAF('organizationName'));
            //         let picture = store.any(me, VCARD('hasPhoto')) || store.any(me, FOAF('image'));
            //         let names = store.each(me, VCARD('fn')).concat(store.each(me, FOAF('name')));

            //             // eslint-disable-next-line
            //             console.log(`Loaded ${name || 'wot no name?'}`);
            //             // eslint-disable-next-line
            //             console.log(`Loaded ${org || 'wot no org?'}`);
            //             // eslint-disable-next-line
            //             console.log(`Loaded ${picture || 'wot no picture?'}`);
            //             // eslint-disable-next-line
            //             console.log(`Loaded ${names || 'wot no names?'}`);
            //     }, err => {
            //         // eslint-disable-next-line
            //         console.log('Load failed ' +  err);
            // });

            // Fetch Full Code
            const store = $rdf.graph();
            const fetcher = new $rdf.Fetcher(store);
            const me = store.sym('https://seb.solid.community/profile/card#me')

            const VCARD = new $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');
            const FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');

            function cardFor (person) {
                let div = document.createElement('div');
                div.innerHTML = `<div style = ‘padding: 0.5em;’>
                    <img style = ‘max-width: 3em; min-width: 3em; border-radius: 0.6em;’
                        src = ‘@@default person image from github.io’>
                        <span style=’text-align: center;’>???</span>
                    </div>
                `;
                let image = div.children[0].children[0];
                let span = div.children[0].children[1];

                fetcher.load(person).then(() => {
                    let name = store.any(person, VCARD('fn')) || store.any(me, FOAF('name'));
                    if (name) {
                        span.textContent =  name.value; // name is a Literal object
                    }

                    let pic = store.any(person, VCARD('hasPhoto'));
                    if (pic) {
                        image.setAttribute('src', pic.uri); // pic is a NamedNode
                    }

                });
                return div;
            }

            let parentDiv = document.createElement('div');
            parentDiv.appendChild(cardFor(me)); // My card

            fetcher.load(me.doc()).then(() => {
                store.each(me, FOAF('knows')).forEach(friend => parentDiv.appendChild(cardFor(friend)));
            });

            const viewDiv = document.querySelector('#rdflib-view');
            viewDiv.appendChild(parentDiv);

        },
    }
</script>

<style lang="scss">
    #rdflib-view {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .rdflib-view-title {
        display: flex;
        width: 200px;
    }
</style>