<template>
  <div class="dropdown__container">
    <div :class="dropdownClass" :style="dropdownStyle">
      <div class="dropdown__inner">
        <button class="dropdown__trigger" @click="handleDropdownClick">
          <slot name="trigger"></slot>
          <icon class="dropdown__icon" name="arrow_drop_down" />
        </button>

        <div class="dropdown__options">
          <slot name="options"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/Icon.vue";

export default {
  components: { Icon },
  props: {
    count: { type: Number, default: 3 }
  },
  data: () => ({
    justMounted: true,
    expanded: false
  }),
  computed: {
    dropdownStyle() {
      return { "--dropdown-count": this.count };
    },
    dropdownClass() {
      if (this.justMounted) return { dropdown: true };

      return {
        dropdown: true,
        "dropdown--expanded": this.expanded,
        "dropdown--collapsed": !this.expanded
      };
    }
  },
  methods: {
    handleDropdownClick() {
      this.justMounted = false;
      this.expanded = !this.expanded;
    }
  }
};
</script>

<style lang="scss">
@function ease($v) {
  $dv: 1 - $v;
  @return 1 - $dv * $dv * $dv * $dv;
}

@mixin animate($animationName, $varName, $expand, $reverse) {
  // Roughly 144Hz
  $frames: 30;

  @keyframes #{$animationName} {
    @for $i from 0 through $frames {
      $step: if($expand, ease($i / $frames), 1 - ease($i / $frames));
      $percent: $i * (100 / $frames);
      $y: 1 / var(#{$varName});

      #{$percent * 1%} {
        @if $reverse {
          transform: scale(1, calc(1 / (#{$y} + (1 - #{$y}) * #{$step})));
        } @else {
          transform: scale(1, calc(#{$y} + (1 - #{$y}) * #{$step}));
        }
      }
    }
  }
}

@include animate(dropdownExpand, --dropdown-count, true, false);
@include animate(dropdownInnerExpand, --dropdown-count, true, true);
@include animate(dropdownCollapse, --dropdown-count, false, false);
@include animate(dropdownInnerCollapse, --dropdown-count, false, true);

.dropdown {
  color: $on-primary;
  background: $accent;
  transform: scaleY(calc(1 / var(--dropdown-count)));
  transform-origin: 50% 0;
  transition: 0.2s background-color, 0.2s color;
  text-align: left;
  overflow: hidden;
  will-change: transform;
  border-radius: 0.3rem;

  &__container {
    overflow: visible;
    height: calc(1em + 0.9rem);
  }

  &--expanded {
    animation: dropdownExpand 0.3s linear;
    animation-fill-mode: forwards;
    animation-timing-function: step-end;
    background: $on-primary;
    color: $accent;
  }

  &--collapsed {
    animation: dropdownCollapse 0.3s linear;
    animation-fill-mode: forwards;
    animation-timing-function: step-end;
  }

  &__inner {
    transform: scaleY(var(--dropdown-count));
    transform-origin: 50% 0;
    will-change: transform;

    .dropdown--expanded & {
      animation: dropdownInnerExpand 0.3s linear;
      animation-fill-mode: forwards;
      animation-timing-function: step-end;
    }

    .dropdown--collapsed & {
      animation: dropdownInnerCollapse 0.3s linear;
      animation-fill-mode: forwards;
      animation-timing-function: step-end;
    }
  }

  &__trigger {
    appearance: none;
    color: inherit;
    background: transparent;
    display: block;
    position: relative;
    width: 100%;
    border: none;
    font-family: $font-heading;
    font-size: inherit;
    line-height: inherit;
    text-align: left;
    padding: 0;
    margin: 0;

    &:focus {
      outline: none;
    }
  }

  &__icon {
    vertical-align: bottom;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    font-size: 1rem;
    vertical-align: middle;
    padding: 0.4rem 0.2rem;
    transition: 0.2s transform;
    transform-origin: center;

    .dropdown--expanded & {
      transform: scale(1, -1);
    }
  }
}
</style>
