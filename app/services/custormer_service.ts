import Customers from "#models/customerModel"
import axios from 'axios'

export class CustormerService {
  static async loadExternalRelations(customer: Customers) {
    try {
      // Récupère toutes les commandes du customer (avec leurs produits déjà inclus)
      const { data: orders } = await axios.get(`https://payetonkawa/api/v1/orders?customerId=${customer.id}`)

      // Retourne un objet enrichi dynamiquement
      return {
        ...customer.toJSON(),
        orders, // qui contient déjà les produits
      }
    } catch (error) {
      console.error(`Erreur lors du chargement des commandes pour le customer ${customer.id}`, error)
      return {
        ...customer.toJSON(),
        orders: [], // fallback vide en cas d'erreur
      }
    }
  }
}