<template>
  <div class="column is-one-third">
    <div class="card large">
      <router-link :to="`/meetups/${meetup._id}`" class="card-meetup-link">
        <div class="card-image">
          <figure class="image is-4by3">
            <img :src="meetup.image" alt="Image" />
          </figure>
        </div>
        <div class="card-content">
          <div class="level m-b-md">
            <div class="media-left">
              <div class="level-item has-text-centered">
                <div>
                  <p class="title">{{ meetup.startDate | formatDate('MMM') }}</p>
                  <p class="title">{{ meetup.startDate | formatDate('D') }}</p>
                </div>
              </div>
            </div>
            <div class="media-content">
              <p class="title is-4 no-padding is-marginless">{{ meetup.title }}</p>
              <span class="tag is-success">{{ meetup.category.name | capitalize }}</span>
              <p class="subtitle is-7">{{ meetup.location }}</p>
            </div>
          </div>
          <div class="content">
            {{ meetup.shortInfo }}
            <div class="background-icon"><span class="icon-barcode"></span></div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeetupItem',
  props: {
    meetup: {
      required: true,
      type: Object,
    },
  },
};
</script>

<style scoped>
.card-meetup-link {
  color: black;
}
</style>
