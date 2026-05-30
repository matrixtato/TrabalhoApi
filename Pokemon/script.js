// const form = document.getElementById("meuForm");
// const personagens = document.getElementById("personagens")


// form.addEventListener("submit", function(evento){
//     evento.preventDefault();

//     const personagem = document.getElementById("personagens").value;

//     buscarPersonagens(personagem);
// });

// async function buscarPersonagens(personagem) {
//     const url = `https://pokeapi.co/api/v2/pokemon/${personagem}`;
//     try {
//         const resposta = await fetch(url);
//         if (!resposta.ok){
//             throw new Error("Pokemon não encontrado na base de dados!");
//         }
//         const dados = await resposta.json();
//         document.getElementById("Nomepkn").textContent = dados.name;
//         document.getElementById("Imagempkn").src = dados.sprites.front_default;
//         document.getElementById("Tipopkn").textContent = `Tipo: ${dados.types.map(t => t.type.name).join(', ')}`;
//         document.getElementById("HPpkn").textContent = `HP: ${dados.stats[0].base_stat}`;
//         document.getElementById("ATKpkn").textContent = `ATK: ${dados.stats[1].base_stat}`;
//         document.getElementById("DEFpkn").textContent = `DEF: ${dados.stats[2].base_stat}`;
//         document.getElementById("SPDpkn").textContent = `SPD: ${dados.stats[5].base_stat}`;
//     } catch (erro) {
//         console.error("falha na comunicação", erro);
//     }
// }

document.getElementById('meuForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const pokemonName = document.getElementById('personagens').value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Pokémon não encontrado');
            return response.json();
        })
        .then(data => {
            // Atualiza Nome e Imagem
            document.getElementById('Nomepkn').textContent = data.name.toUpperCase();
            document.getElementById('imagempkn').src = data.sprites.front_default;
            
            // Atualiza Tipos
            const tipos = data.types.map(typeInfo => typeInfo.type.name).join(', ');
            document.getElementById('Tipopkn').textContent = tipos;

            // Atualiza Stats
            const stats = {};
            data.stats.forEach(stat => {
                stats[stat.stat.name] = stat.base_stat;
            });

            document.getElementById('HPpkn').textContent = stats['hp'];
            document.getElementById('ATKpkn').textContent = stats['attack'];
            document.getElementById('DEFpkn').textContent = stats['defense'];
            document.getElementById('SPDpkn').textContent = stats['speed'];
        })
        .catch(error => alert(error.message));
});