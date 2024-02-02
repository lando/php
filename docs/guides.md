---
description: Home helpful guides for the PHP recipe.
layout: page
title: Guides
sidebar: false
---

<script setup>
import {VPLCollectionPage, VPLCollectionPageTitle, VPLCollectionItems} from '@lando/vitepress-theme-default-plus';
import {useCollection} from '@lando/vitepress-theme-default-plus';

const {prev, pages} = useCollection('guide');

</script>

<VPLCollectionPage>
  <VPLCollectionPageTitle>
    <template #title>
      Guides
    </template>
    <template #lead>
      Helpful tutorial-like content!
    </template>
  </VPLCollectionPageTitle>
  <VPLCollectionItems :items="pages"/>
</VPLCollectionPage>
