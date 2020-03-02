<template>
  <div class="container">
    <ErrorView
      :title="'Ooooops, you are not authorized to visit this page, please login'"
      :status="`401`"
      :navigateToPage="'PageLogin'"
      :navigateToText="'Login'"
    />
  </div>
</template>

<script>
import ErrorView from '@/components/ErrorView';

export default {
  name: 'PageNotAuthenticated',
  components: {
    ErrorView,
  },
};
</script>

<style scoped></style>
