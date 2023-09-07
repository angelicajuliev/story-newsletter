import pytest
from newsletter.services import unsubscribe_by_email, unsubscribe_by_email_and_category
from newsletter.models import Recipient, Category

@pytest.fixture
def create_recipient(db):
    def inner(email):
        return Recipient.objects.create(email=email)
    return inner

@pytest.fixture
def create_category(db):
    def inner(name):
        return Category.objects.create(name=name)
    return inner


class TestUnsubscribeByEmail:
    def test_unsubscribe_by_email(self, create_recipient):
        # Arrange
        email = "myrandom@email.com"
        create_recipient(email)

        # Act
        unsubscribe_by_email(email)

        # Assert
        assert Recipient.objects.filter(email=email).count() == 0
      
    def test_unsubscribe_by_email_not_found(self, db):
        # Arrange
        email = "myrandomemail.com"

        # Act - Assert
        with pytest.raises(Recipient.DoesNotExist):
            unsubscribe_by_email(email)

class TestUnsubscribeByEmailAndCategory:
    def test_unsubscribe_by_email_and_category(self, create_recipient, create_category):
        # Arrange
        email = "myrandomemail.com"
        category = create_category("Test Category")
        recipient = create_recipient(email)
        recipient.category_subscription.add(category)

        # Act
        unsubscribe_by_email_and_category(email, category.id)

        # Assert
        assert Recipient.objects.filter(email=email).count() == 1
        assert Recipient.objects.get(email=email).category_subscription.count() == 0

    def test_unsubscribe_by_email_and_category_not_found(self, create_recipient, create_category):
        # Arrange
        email = "myrandomemail.com"
        category = create_category("Test Category")
        recipient = create_recipient(email)
        recipient.category_subscription.add(category)

        expected_categories = Recipient.objects.get(email=email).category_subscription.count()

        # Act - Assert
        unsubscribe_by_email_and_category(email, -1)

        # Assert
        assert Recipient.objects.filter(email=email).count() == 1
        assert Recipient.objects.get(email=email).category_subscription.count() == expected_categories

    def test_unsubscribe_by_email_and_category_recipient_not_found(self, create_category):
        # Arrange
        email = "myrandomemail.com"
        category = create_category("Test Category")

        # Act - Assert
        with pytest.raises(Recipient.DoesNotExist):
            unsubscribe_by_email_and_category(email, category.id)
