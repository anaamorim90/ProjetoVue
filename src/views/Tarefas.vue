<template>
  <div>
    <div>
      <form @submit.prevent="cadastrar">
        <h2>Controle de Tarefas</h2>
        <div class="form-group">
          <label for="nome">Assunto</label>
          <input type="text" id="nome"
              class="form-control" required autofocus
              v-model="nome">
        </div>
        <div class="form-group">
          <label for="descricao">Descrição</label>
          <textarea id="texto"
              class="form-control" required
              v-model="descricao">
          </textarea>
        </div>
        <div class="form-group">
          <label for="dataLimite">Data Limite</label>
          <textarea type="date" id="date"
              class="form-control" required
              v-model="dataLimite">
          </textarea>
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Salvar</button>
      </form>
    </div>
    <br>
    <table class="table table-striped">
      <tr>
        <th>Id</th>
        <th>Tarefa</th>
        <th>Descrição</th>
        <th>Data Limite</th>
        <th>Usuário</th>
      </tr>
      <tr v-for="tar in anotacoes" :key="tar.id">
        <td>{{ tar.id }}</td>
        <td>{{ tar.nome }}</td>
        <td>{{ tar.descricao }}</td>
        <td>{{ tar.dataLimite }}</td>
        <td>{{ tar.usuario.nome }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'anotacoes',
  data() {
    return {
      nome: '',
      descricao: '',
      dataLimite: '',
      anotacoes: []
    }
  },
  computed: {
    ...mapState([
      'usuario'
    ])
  },
  methods: {
    cadastrar() {
      axios.post('tarefa/save',
          {
            nome: this.nome,
            descricao: this.descricao,
            dataLimite: this.dataLimite,
            usuario: this.usuario
          })
        .then(res => {
          this.nome = ''
          this.descricao = ''
          this.dataLimite = ''
          this.atualizar()
        })
        .catch(error => console.log(error))
    },
    atualizar () {
      axios.get('/tarefa/getAll', 
          { headers: { Accept: 'application/json' } })
        .then(res => {
          console.log(res)
          this.anotacoes = res.data
        })
        .catch(error => console.log(error))
    }
  },
  created () {
    this.atualizar()
  }
}
</script>
