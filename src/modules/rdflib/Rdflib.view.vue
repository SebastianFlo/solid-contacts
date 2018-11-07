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
            const store = $rdf.graph();
            // eslint-disable-next-line
            console.log('store', store);

            const me = store.sym('https://example.com/alice/card#me');
            // eslint-disable-next-line
            console.log('me', me);

            const profile = me.doc();
            // eslint-disable-next-line
            console.log('profile', profile);

            const VCARD = new $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');
            // eslint-disable-next-line
            console.log('VCARD', VCARD('fn'));

            store.add(me, VCARD('fn'), 'John Bloggs', profile);
            // eslint-disable-next-line
            console.log('store', store);

            let name = store.any(me, VCARD('name'), null, profile);
            // eslint-disable-next-line
            console.log('name', name);

            name = store.any(me, VCARD('name'));
            // eslint-disable-next-line
            console.log('name', name);

            // === With Turtle

            let text = '<#this>  a  <#Example> .';
            let doc = $rdf.sym('https://example.com/alice/card');

            let storeTurtle = $rdf.graph();

            $rdf.parse(text, storeTurtle, doc.uri, 'text/turtle');  // pass base URI
            // eslint-disable-next-line
            console.log('storeTurtle.toNT', storeTurtle.toNT());

            // eslint-disable-next-line
            console.log('$rdf.serialize', $rdf.serialize(doc, storeTurtle, doc.uri, 'text/turtle'));

            // === Search the store
            let quads = storeTurtle.match();
            // eslint-disable-next-line
            console.log('quads', quads);

            quads = storeTurtle.match(null, null, null, doc);
            // eslint-disable-next-line
            console.log('quads', quads);

            quads = storeTurtle.match(null, null, null, me.doc());
            // eslint-disable-next-line
            console.log('quads', quads);

            quads = storeTurtle.match(null, null, me, me.doc());
            // eslint-disable-next-line
            console.log('quads', quads);


            let oldEmail = $rdf.sym('mailto:albert@example.com')
            // eslint-disable-next-line
            console.log('oldEmail', oldEmail);

            let outOfDate = storeTurtle.match(null, null, oldEmail, null).map(st => st.why);
            // eslint-disable-next-line
            console.log('outOfDate', outOfDate);
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