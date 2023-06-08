<template>
  <div id="app">
    <div class="filter">
      <p>Выведено карточек: {{ filteredEntities.length }}</p>

      <form>
        <label for="filter_class_types">Фильтр по типам класса:
          <select id="filter_class_types" v-model="classTypesFilter">
            <option
              v-for="(classTypesFilterValue, index) of classTypesFilterValues"
              :key="index"
              :label="classTypesFilterValue.name"
              :value="classTypesFilterValue.id"
            ></option>
          </select>
        </label>
      </form>
    </div>

    <div
      v-for="(entitie, index) of filteredEntities"
      :key="index"
      class="card"
    >
      <p class="card__title">
        {{ entitie.subject.name }} - {{ entitie.teacher.name }}
      </p>
      <p class="card__price">
        Цена: {{ entitie.price.amount }} {{ entitie.price.currency }}
      </p>
      <p class="card__class-type" :style="`background-color: ${entitie.classType.color};`">
        Тип класса: {{ entitie.classType.name }}
      </p>
      <p class="card__description">
        Описание продукта: {{ entitie.description }}
      </p>
    </div>
  </div>
</template>

<script>
import Api from '@/api';

export default {
  name: 'HomeView',
  data() {
    return {
      classTypes: [],
      subjects: [],
      teachers: [],
      products: [],
      entities: [],

      classTypesFilter: null,
    };
  },
  mounted() {
    this.makeEntities();
  },
  computed: {
    classTypesFilterValues() {
      return [
        { id: null, name: 'Все' },
        ...this.classTypes.map((classType) => ({ id: classType.id, name: classType.name })),
      ];
    },
    filteredEntities() {
      return this.classTypesFilter === null
        ? this.entities
        : this.entities.filter((entity) => entity.classType.id === this.classTypesFilter);
    },
  },
  methods: {
    async makeEntities() {
      await this.getEntities();
      this.prepareEntities();
    },
    async getEntities() {
      const api = new Api(['classTypes', 'subjects', 'products', 'teachers']);
      [this.classTypes, this.subjects, this.products, this.teachers] = await api.get();
    },
    prepareEntities() {
      this.products.forEach((product) => {
        this.entities.push({
          ...product,
          teacher: this.teachers.find((teacher) => teacher.id === product.teacher_id),
          classType: this.classTypes.find((classType) => classType.id === product.class_type_id),
          subject: this.subjects.find((subject) => subject.id === product.subject_id),
        });
      });
    },
  },
};
</script>

<style>
p {
  padding: 5px;
  margin-top: 0;
  margin-bottom: 5px;
}
.card {
  margin: 15px;
  padding: 15px;
  border: 1px solid green;
}
.card__title {
  font-size: 14px;
  font-weight: bold;
}
</style>
