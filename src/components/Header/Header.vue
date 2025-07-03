<script setup lang="ts">
import LogOutButton from '../Icons/LogOutButton.vue'
import './Header.scss'
const user = localStorage.getItem('user') ?? '{}'

const { first_name = '', last_name = '', balance = 0, user_type = 'client' } = JSON.parse(user)


const handleNumberToRanges = (number: number): string => {
    if (!Number.isFinite(number)) {
        return '0';
    }
    return new Intl.NumberFormat('ru-RU').format(number);
}

const handleLogOut = () => {
    localStorage.removeItem('user')
    location.reload()
}
</script>

<template>
    <header>
        <div class="logo-container">
            <p>ПРАВО-Видeние</p>
        </div>
        <nav>
            <button>
                Найти юриста
            </button>
            <button>
                Задать вопрос
            </button>
        </nav>
        <div class="lk">
            <button>
                {{ handleNumberToRanges(balance) }} ₽
            </button>
            <div class="lk-profile">
                <div class="img-wrapper" :class="{ lawyer: user_type === 'lawyer' }">
                </div>
                <p>
                    {{ first_name }} {{ last_name }}
                </p>
            </div>
            <button class="button-icon" @click.prevent="handleLogOut">
                <LogOutButton color="#072138" />
            </button>
        </div>
    </header>
</template>